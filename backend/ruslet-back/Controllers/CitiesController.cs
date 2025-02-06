using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ruslet_back.Models;
using ruslet_database.Tables;
using ruslet_database.Utils;
using System.Net;

namespace ruslet_back.Controllers
{
    [Authorize]
    [Route("api/v1/subjects")]
    [ApiController]
    public class CitiesController: ControllerBase
    {
        private readonly ICitiesUtils CitiesUtils;
        public CitiesController(ICitiesUtils citiesUtils)
        {
            CitiesUtils = citiesUtils;
        }

        [HttpGet]
        [Route("allsubjects")]
        public async Task<IActionResult> GetSubjectsAsync()
        {
            var subjects = await CitiesUtils.GetSubjectsAsync();
            if (subjects == null)
                return new JSON<string>()
                {
                    Title = "Ошибка",
                    Status = (int)HttpStatusCode.Conflict,
                    Errors = new Dictionary<string, string>() { { nameof(Subject), "Ошибка при получении данных" } }
                };
            if (subjects.ToList().Count==0)
                return new JSON<string>()
                {
                    Title = "Ошибка",
                    Status = (int)HttpStatusCode.Conflict,
                    Errors = new Dictionary<string, string>() { { nameof(Subject), "Данные отсутствуют" } }
                };
            return new JSON<List<Subject>>()
            {
                Title = "Успешно",
                Status = (int)HttpStatusCode.OK,
                Errors = new Dictionary<string, string>(),
                Data=subjects.ToList()
            };
        }

        [HttpPost]
        [Route("allcities")]
        public async Task<IActionResult> GetCitiesAsync([FromBody] int subjectId)
        {
            var cities = await CitiesUtils.GetCitiesAsync(subjectId);
            if (cities == null)
                return new JSON<string>()
                {
                    Title = "Ошибка",
                    Status = (int)HttpStatusCode.Conflict,
                    Errors = new Dictionary<string, string>() { { nameof(City), "Ошибка при получении данных" } }
                };
            if (cities.ToList().Count == 0)
                return new JSON<string>()
                {
                    Title = "Ошибка",
                    Status = (int)HttpStatusCode.Conflict,
                    Errors = new Dictionary<string, string>() { { nameof(City), "Данные отсутствуют" } }
                };
            return new JSON<List<City>>()
            {
                Title = "Успешно",
                Status = (int)HttpStatusCode.OK,
                Errors = new Dictionary<string, string>(),
                Data = cities.ToList()
            };
        }
    }
}
