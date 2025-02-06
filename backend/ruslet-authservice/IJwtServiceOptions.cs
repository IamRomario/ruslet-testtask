using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ruslet_authservice
{
    public interface IJwtServiceOptions
    {
        public string Audience { get; }

        public string Issuer { get; }

        public SymmetricSecurityKey Key { get; }

        public int Lifetime { get; }

        public byte[] Salt { get; }
    }
}
