using Funq;
using Microsoft.AspNetCore.Identity;
using ServiceStack;
using ServiceStack.Mvc;

[assembly: HostingStartup(typeof(Validation.AppHost))]

namespace Validation;

public class AppHost() : AppHostBase("Validation"), IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) =>
        {
            services.AddPlugin(new RazorFormat()); // enable ServiceStack.Razor
        });

    // Configure your AppHost with the necessary configuration and dependencies your App needs
    public override void Configure(Container container)
    {
        // enable server-side rendering, see: https://sharpscript.net/docs/sharp-pages
        Plugins.Add(new SharpPagesFeature()); 

        SetConfig(new HostConfig
        {
            AddRedirectParamsToQueryString = true,
            DebugMode = AppSettings.Get(nameof(HostConfig.DebugMode), HostingEnvironment.IsDevelopment()),
            UseSameSiteCookies = true,
        });
        
        var scopeFactory = ApplicationServices.GetRequiredService<IServiceScopeFactory>();
        using var scope = scopeFactory.CreateScope();
        using var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        dbContext.Database.EnsureCreated();
        
        // Only seed users if DB was just created
        if (!dbContext.Users.Any())
        {
            AddSeedUsers(scope.ServiceProvider).Wait();
        }
    }

    private async Task AddSeedUsers(IServiceProvider services)
    {
        //initializing custom roles 
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        string[] allRoles = [Roles.Admin, Roles.Manager, Roles.Employee];

        void assertResult(IdentityResult result)
        {
            if (!result.Succeeded)
                throw new Exception(result.Errors.First().Description);
        }

        async Task EnsureUserAsync(ApplicationUser user, string password, string[]? roles = null)
        {
            var existingUser = await userManager.FindByEmailAsync(user.Email!);
            if (existingUser != null) return;

            user.DisplayName = $"{user.FirstName} {user.LastName}";
            await userManager!.CreateAsync(user, password);
            if (roles?.Length > 0)
            {
                var newUser = await userManager.FindByEmailAsync(user.Email!);
                assertResult(await userManager.AddToRolesAsync(user, roles));
            }
        }

        foreach (var roleName in allRoles)
        {
            var roleExist = await roleManager.RoleExistsAsync(roleName);
            if (!roleExist)
            {
                //Create the roles and seed them to the database
                assertResult(await roleManager.CreateAsync(new IdentityRole(roleName)));
            }
        }

        await EnsureUserAsync(new ApplicationUser
        {
            DisplayName = "Test User",
            Email = "test@email.com",
            UserName = "test@email.com",
            FirstName = "Test",
            LastName = "User",
            EmailConfirmed = true,
        }, "p@55wOrd");

        await EnsureUserAsync(new ApplicationUser
        {
            DisplayName = "Test Employee",
            Email = "employee@email.com",
            UserName = "employee@email.com",
            FirstName = "Test",
            LastName = "Employee",
            EmailConfirmed = true,
        }, "p@55wOrd", [Roles.Employee]);

        await EnsureUserAsync(new ApplicationUser
        {
            DisplayName = "Test Manager",
            Email = "manager@email.com",
            UserName = "manager@email.com",
            FirstName = "Test",
            LastName = "Manager",
            EmailConfirmed = true,
        }, "p@55wOrd", [Roles.Manager, Roles.Employee]);

        await EnsureUserAsync(new ApplicationUser
        {
            DisplayName = "Admin User",
            Email = "admin@email.com",
            UserName = "admin@email.com",
            FirstName = "Admin",
            LastName = "User",
            EmailConfirmed = true,
        }, "p@55wOrd", allRoles);
    }
}