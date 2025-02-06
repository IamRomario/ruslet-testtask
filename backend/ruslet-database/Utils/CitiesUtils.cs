using Microsoft.Extensions.Configuration;
using ruslet_database.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ruslet_database.Utils
{
    public class CitiesUtils : ICitiesUtils
    {
        private readonly IConfiguration Config;
        public CitiesUtils(IConfiguration config)
        {
            Config = config;
        }

        public async Task<IEnumerable<City>> GetCitiesAsync(int subjectId)
        {
            try
            {
                using (var DB = new DataBase(Config))
                {
                    if (DB.Cities.Where(it=>it.SubjectId==subjectId).Any())
                        return DB.Cities.Where(it => it.SubjectId == subjectId).ToList();
                }
                return new List<City>();
            }
            catch (Exception ex)
            {
                //TODO:logs
                return null;
            }
        }

        public async Task<IEnumerable<Subject>> GetSubjectsAsync()
        {
            try
            {
                using (var DB = new DataBase(Config))
                {
                    if (DB.Subjects.Any())
                        return DB.Subjects.ToList();
                }
                return new List<Subject>();
            }
            catch (Exception ex)
            {
                //TODO:logs
                return null;
            }
        }
    }
}
