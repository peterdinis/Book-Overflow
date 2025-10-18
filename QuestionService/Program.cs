using QuestionService.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.AddServiceDefaults();

builder.Services.AddAuthentication()
    .AddKeycloakJwtBearer(serviceName: "keycloack", realm: "bookoverflow", options =>
    {
        options.RequireHttpsMetadata = false;
        options.Audience = "bookoverflow";
    });

builder.Services.AddDbContext<QuestionDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAuthorization();
app.MapControllers();
app.MapDefaultEndpoints();

app.Run();