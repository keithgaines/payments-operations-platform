using Microsoft.EntityFrameworkCore;
using PaymentsOps.Api.Data;
using PaymentsOps.Api.Features.Merchants;
using PaymentsOps.Api.Features.Transactions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/", () => Results.Ok(new { Service = "Payments Operations API", Status = "Running" }));

app.MapMerchantEndpoints();
app.MapTransactionEndpoints();

app.Run();
