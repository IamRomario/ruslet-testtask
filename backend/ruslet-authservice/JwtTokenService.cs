using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using ruslet_database.Tables;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ruslet_authservice
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly IJwtServiceOptions Options;
        public JwtTokenService(IJwtServiceOptions options)
        {
            Options=options;
        }

        public async Task<string> GenerateAccessTokenAsync(User user)
        {
            try
            {
                var expirationTime = DateTime.UtcNow.Add(TimeSpan.FromMinutes(Options.Lifetime));
                var jwt = new JwtSecurityToken(
                    issuer: Options.Issuer,
                    audience: Options.Audience,
                    claims: CreateClaim(user, expirationTime),
                    expires: expirationTime,
                    notBefore: DateTime.UtcNow,
                    signingCredentials: new SigningCredentials(Options.Key, SecurityAlgorithms.HmacSha256));
                var token = new JwtSecurityTokenHandler().WriteToken(jwt);
                return token;
            }
            catch (Exception ex)
            {
                //TDOD:logs
                return null;
            }
        }

        public async Task<string> GetHashFromPasswordAsync(string password)
        {
            return password;
            var hash = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: Options.Salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 1000,
                numBytesRequested: 256 / 8));
            return hash;
        }
        public static IEnumerable<Claim> CreateClaim(User user, DateTime expiration_time)
        {
            Claim[] claims = new Claim[] {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, "root"),
                new Claim(ClaimTypes.Expiration, expiration_time.Ticks.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };
            return claims;
        }
    }

}
