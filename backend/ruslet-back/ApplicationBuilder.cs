using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using ruslet_authservice;
using ruslet_database.Utils;
using System.Text;

namespace ruslet_back
{
    public static class ApplicationBuilder
    {
        public static WebApplicationBuilder InitializeServices(this WebApplicationBuilder builder)
        {
            builder.WebHost.ConfigureKestrel(options =>
            {
                options.ListenAnyIP(5000);
            });

            builder.Logging.ClearProviders();
            builder.Logging.AddConsole();

            builder.Services.AddControllers();

            builder.Services.AddScoped<IUserUtils, UserUtils>();
            builder.Services.AddScoped<ICitiesUtils, CitiesUtils>();

            builder.Services.AddScoped<IJwtServiceOptions, JwtServiceOptions>();
            builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = builder.Configuration.GetSection(nameof(JwtServiceOptions)).GetValue<string>(nameof(JwtServiceOptions.Issuer)),
                    ValidateAudience = true,
                    ValidAudience = builder.Configuration.GetSection(nameof(JwtServiceOptions)).GetValue<string>(nameof(JwtServiceOptions.Audience)),
                    ValidateLifetime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration.GetSection(nameof(JwtServiceOptions)).GetValue<string>(nameof(JwtServiceOptions.Key)))),
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero
                };
            });


            return builder;
        }
    }
}
