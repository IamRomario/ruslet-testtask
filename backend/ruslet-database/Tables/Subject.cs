using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ruslet_database.Tables
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<City> Cities { get; set; }
    }
}
