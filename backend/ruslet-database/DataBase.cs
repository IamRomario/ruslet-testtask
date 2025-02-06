using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ruslet_database.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ruslet_database
{
    internal class DataBase : DbContext
    {
        private readonly IConfiguration Config;
        public DataBase(IConfiguration config)
        {
            Config = config;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(Config.GetConnectionString("ruslet-test"));
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<City> Cities { get; set; }
    }
}
