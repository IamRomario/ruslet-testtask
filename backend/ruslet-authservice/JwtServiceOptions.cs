using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ruslet_authservice
{
    public class JwtServiceOptions:IJwtServiceOptions
    {
        public string Audience { get; }

        public string Issuer { get; }

        public SymmetricSecurityKey Key { get; }

        public int Lifetime { get; }

        public byte[] Salt { get; }

        public JwtServiceOptions(IConfiguration config)
        {
            //Salt = Convert.FromBase64String(config.GetSection(nameof(JwtServiceOptions)).GetValue<string>(nameof(Salt)));
            Key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(config.GetSection(nameof(JwtServiceOptions)).GetValue<string>(nameof(Key))));
            Lifetime = config.GetSection(nameof(JwtServiceOptions)).GetValue<int>(nameof(Lifetime));
            Issuer = config.GetSection(nameof(JwtServiceOptions)).GetValue<string>(nameof(Issuer));
            Audience = config.GetSection(nameof(JwtServiceOptions)).GetValue<string>(nameof(Audience));
        }
    }
}
