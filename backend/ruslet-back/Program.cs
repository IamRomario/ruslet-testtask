using ruslet_back;
using ruslet_back.Exceptions;

var app = WebApplication.CreateBuilder(args)
                        .InitializeServices()
                        .Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandlerMiddleware();

}
app.UseCors(builder => builder.WithOrigins("https://localhost:3000/", "http://localhost:3000/", "http://localhost:3000")
                                 .AllowCredentials()
                                 .AllowAnyHeader());


app.UseCookiePolicy(new CookiePolicyOptions
{
    MinimumSameSitePolicy = SameSiteMode.Strict,
    Secure = CookieSecurePolicy.SameAsRequest
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();