using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ruslet_back.Models;

namespace ruslet_back.Controllers
{
    [Authorize]
    [Route("api/v1/calc")]
    [ApiController]
    public class CalcContrroller:ControllerBase
    {
        [HttpPost]
        [Route("exportexcell")]
        public async Task<IActionResult> DownloadAsExcellAsync([FromBody] ExportRequest requestData)
        {
            var stream = ruslet_calc.Calc.ExportExcel(requestData.SnowPressure, requestData.WindPressure, requestData.TemperatureWarm, requestData.TemperatureCold);
            stream.Position = 0;
            return File(stream, "application/octet-stream", "test.xlsx");
        }
    }
}
