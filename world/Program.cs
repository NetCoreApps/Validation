using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using ServiceStack;

namespace Validation
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateWebHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseModularStartup<Startup,StartupActivator>();
                });
    }

    public class StartupActivator : ModularStartupActivator
    {
        public StartupActivator(IConfiguration configuration) : base(configuration) { }
    }
}