using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.OrmLite.Converters;

[assembly: HostingStartup(typeof(Validation.ConfigureDb))]

namespace Validation;

// Database can be created with "dotnet run --AppTasks=migrate"   
public class ConfigureDb : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) =>
        {
            var dbFactory = new OrmLiteConnectionFactory(
                context.Configuration.GetConnectionString("DefaultConnection"),
                SqliteDialect.Provider);
            services.AddSingleton<IDbConnectionFactory>(dbFactory);
            ((DateTimeConverter)SqliteDialect.Provider.GetConverter<DateTime>()).DateStyle = DateTimeKind.Utc;
        })
        .ConfigureAppHost(appHost =>
        {
            using var db = appHost.Resolve<IDbConnectionFactory>().OpenDbConnection();
        });
}