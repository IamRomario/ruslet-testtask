using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;
using ruslet_authservice;
using ruslet_back.Models;
using ruslet_database.Utils;
using System.Net;

namespace ruslet_back.Controllers
{
    [Authorize]
    [Route("api/v1/auth")]
    [ApiController]
    public class AuthController: ControllerBase
    {
        private readonly IUserUtils UserUtils;
        private readonly IJwtTokenService JwtTokenService;

        public AuthController(IUserUtils userUtils, IJwtTokenService jwtTokenService)
        {
            UserUtils = userUtils;
            JwtTokenService= jwtTokenService;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> SignInAsync([FromBody] SignInRequest credentials)
        {
            var user = await UserUtils.GetUserAsync(credentials.Login, await JwtTokenService.GetHashFromPasswordAsync(credentials.Password));
            if (user == null)
                return new JSON<string>()
                {
                    Title = "Ошибка",
                    Status = (int)HttpStatusCode.Conflict,
                    Errors = new Dictionary<string, string>() { { nameof(Exception), "Ошибка пользовательских данных" } }
                };
            var jwt = await JwtTokenService.GenerateAccessTokenAsync(user);
            if (jwt == null)
                return new JSON<string>()
                {
                    Title = "Ошибка",
                    Status = (int)HttpStatusCode.Conflict,
                    Errors = new Dictionary<string, string>() { { nameof(Exception), "Ошибка генерации ключа" } }
                };
            return new JSON<string>()
            {
                Title = "Успешно",
                Status = (int)HttpStatusCode.OK,
                Errors = new Dictionary<string, string>(),
                Data=jwt
            };
        }
    }
}
