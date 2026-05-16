using Microsoft.EntityFrameworkCore;
using PaymentsOps.Api.Data;
using PaymentsOps.Api.Features.Analytics;
using PaymentsOps.Api.Features.Merchants;
using PaymentsOps.Api.Features.Transactions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "Frontend",
        policy =>
        {
            policy
                .WithOrigins(
                    "http://localhost:3000",
                    "https://payments-operations-platform.vercel.app",
                    "https://payments-operations-platform-git-develop-keithgaines-projects.vercel.app"
                )
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    );
});

var app = builder.Build();

app.UseCors("Frontend");

app.UseHttpsRedirection();

app.MapGet("/", () => Results.Ok(new { Service = "Payments Operations API", Status = "Running" }));

app.MapMerchantEndpoints();
app.MapTransactionEndpoints();
app.MapAnalyticsEndpoints();

app.Run();
