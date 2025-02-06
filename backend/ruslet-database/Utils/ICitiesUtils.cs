using ruslet_database.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ruslet_database.Utils
{
    public interface ICitiesUtils
    {
        public Task<IEnumerable<Subject>> GetSubjectsAsync();
        public Task<IEnumerable<City>> GetCitiesAsync(int subjectId);
    }
}
