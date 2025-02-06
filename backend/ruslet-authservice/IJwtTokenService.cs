using ruslet_database.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace ruslet_authservice
{
    public interface IJwtTokenService
    {
        public Task<string> GetHashFromPasswordAsync(string password);
        public Task<string> GenerateAccessTokenAsync(User user);
    }
}
