using Microsoft.Extensions.Configuration;
using ruslet_database.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ruslet_database.Utils
{
    public class UserUtils : IUserUtils
    {
        private readonly IConfiguration Config;
        public UserUtils(IConfiguration config)
        {
            Config = config;
        }
        public async Task<User> GetUserAsync(string login, string password)
        {
            try
            {
                using (var DB = new DataBase(Config))
                {
                    return DB.Users.FirstOrDefault(it => it.Login == login && it.Password == password);
                }
            }
            catch (Exception ex)
            {
                //TODO:logs
                return null;
            }
        }
    }
}
