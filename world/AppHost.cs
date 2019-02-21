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
            SetConfig(new HostConfig
            {
                AddRedirectParamsToQueryString = true,
                DebugMode = AppSettings.Get(nameof(HostConfig.DebugMode), false),
                UseSameSiteCookies = true,
            });
            
            // enable server-side rendering, see: http://templates.servicestack.net
            Plugins.Add(new TemplatePagesFeature()); 

            Plugins.Add(new RazorFormat()); // enable ServiceStack.Razor
            
            Plugins.Add(new ValidationFeature());

            if (Config.DebugMode)
            {
                Plugins.Add(new HotReloadFeature());
            }
        }
    }
}