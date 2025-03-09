using LafotHakfarBackend.Bakery.Application.Services;
using LafotHakfarBackend.Bakery.Domain.Models;
using LafotHakfarBackend.Bakery.Infrastructure.FileStorage;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddSingleton(new FileStorageService<Sale>("sales.json"));
builder.Services.AddSingleton<SalesService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure middleware
app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();
app.UseSwagger();
app.UseSwaggerUI();

app.Run();