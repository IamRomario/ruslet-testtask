using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ruslet_database.Tables
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int SubjectId { get; set; }
        public virtual Subject Subject { get; set; }
        public double SnowPressure { get; set; }
        public double WindPressure { get; set; }
        public double TemperatureWarm { get; set; }
        public double TemperatureCold { get; set; }
    }
}
