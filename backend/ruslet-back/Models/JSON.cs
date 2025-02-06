using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Net;

namespace ruslet_back.Models
{
    public class JSON<T> : IActionResult
    {
        public Dictionary<string, string> Errors { get; set; } = new Dictionary<string, string>();

        public string Title { get; set; } = default;

        public string Debug { get; set; } = default;

        public int Status { get; set; } = 200;

        public T? Data { get; set; } = default;
        public JSON() { }

        public JSON(T body, string title)
        {
            this.Status = (int)HttpStatusCode.OK;
            this.Data = body;
            if (title != null)
            {
                this.Title = title;
            }
            else
            {
                this.Title = this.Status < 300 ? "Успешно!" : (this.Status < 400 ? "Перенаправлено!" : (this.Status < 500 ? "Недоступно!" : "Произошла ошибка!"));
            }
        }
        public JSON(T body, HttpStatusCode status = HttpStatusCode.OK)
        {
            this.Status = (int)status;
            this.Data = body;
            this.Title = this.Status < 300 ? "Успешно!" : (this.Status < 400 ? "Перенаправлено!" : (this.Status < 500 ? "Недоступно!" : "Произошла ошибка!"));
        }
        protected static string ExtractError(Exception e, int number = 0)
        {
            var message = $"#{number} {e.Message}\nSTACKTRACE:\n{e.StackTrace}\n*****\n";
            if (e.InnerException != null)
            {
                message += ExtractError(e.InnerException, number + 1);
            }
            return message;
        }
        public async Task ExecuteResultAsync(ActionContext context)
        {
            context.HttpContext.Response.StatusCode = Status;
            context.HttpContext.Response.ContentType = "application/json";
            var serializerSettings = new JsonSerializerSettings();
            serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver()
            {
                NamingStrategy = new CamelCaseNamingStrategy()
                {
                    ProcessDictionaryKeys = false
                }
            };
            await HttpResponseWritingExtensions.WriteAsync(context.HttpContext.Response, JsonConvert.SerializeObject(this, serializerSettings));
        }
    }
}
