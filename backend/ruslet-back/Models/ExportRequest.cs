namespace ruslet_back.Models
{
    public class ExportRequest
    {
        public double SnowPressure { get; set; }
        public double WindPressure { get; set; }
        public double TemperatureWarm { get; set; }
        public double TemperatureCold { get; set; }
    }
}
