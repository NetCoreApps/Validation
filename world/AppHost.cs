using Funq;
using ServiceStack;
using ServiceStack.Mvc;
using ServiceStack.Validation;
using Validation.ServiceInterface;
using Microsoft.AspNetCore.Hosting;
using ServiceStack.Api.OpenApi;

namespace Validation
{
    public class AppHost : AppHostBase
    {
        public AppHost() : base("Validation", typeof(ContactServices).Assembly) { }

        // Configure your AppHost with the necessary configuration and dependencies your App needs
        public override void Configure(Container container)
        {
            SetConfig(new HostConfig
            {
                AddRedirectParamsToQueryString = true,
                DebugMode = AppSettings.Get(nameof(HostConfig.DebugMode), HostingEnvironment.IsDevelopment()),
                UseSameSiteCookies = true,
            });
            
            // enable server-side rendering, see: https://sharpscript.net/docs/sharp-pages
            Plugins.Add(new SharpPagesFeature()); 

            Plugins.Add(new RazorFormat()); // enable ServiceStack.Razor
            
            Plugins.Add(new ValidationFeature());

            Plugins.Add(new OpenApiFeature());

            if (Config.DebugMode)
            {
                Plugins.Add(new HotReloadFeature());
            }
        }
    }
}