using Funq;
using ServiceStack;
using ServiceStack.Mvc;
using ServiceStack.Validation;
using Validation.ServiceInterface;

namespace Validation
{
    public class AppHost : AppHostBase
    {
        public AppHost() : base("Validation", typeof(ContactServices).Assembly) { }

        // Configure your AppHost with the necessary configuration and dependencies your App needs
        public override void Configure(Container container)
        {
            // enable server-side rendering, see: http://templates.servicestack.net
            Plugins.Add(new TemplatePagesFeature()); 

            if (Config.DebugMode)
            {
                Plugins.Add(new HotReloadFeature());
            }

            Plugins.Add(new RazorFormat()); // enable ServiceStack.Razor
            
            SetConfig(new HostConfig
            {
                AddRedirectParamsToQueryString = true,
                DebugMode = AppSettings.Get(nameof(HostConfig.DebugMode), false),
                UseSameSiteCookies = true,
            });
            
            Plugins.Add(new ValidationFeature());
        }
    }
}