using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ToDoProjectDal.Repositories;
using ToDoProjectDal.Repositories.Impl;

namespace ToDoProjectBll.Helpers
{
    public static class ConfigurationServices
    {
        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IAccountRepository, AccountRepository>();
            services.AddTransient<IToDoCardRepository, ToDoCardRepository>();
        }
    }
}
