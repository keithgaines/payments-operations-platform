using Microsoft.EntityFrameworkCore;
using PaymentsOps.Api.Data;
using PaymentsOps.Api.Models;

namespace PaymentsOps.Api.Features.Merchants;

public static class MerchantEndpoints
{
    public static void MapMerchantEndpoints(this WebApplication app)
    {
        app.MapGet(
            "/api/merchants",
            async (AppDbContext db) =>
            {
                var merchants = await db
                    .Merchants.OrderByDescending(m => m.CreatedAt)
                    .ToListAsync();

                return Results.Ok(merchants);
            }
        );

        app.MapGet(
            "/api/merchants/{id:guid}",
            async (Guid id, AppDbContext db) =>
            {
                var merchant = await db.Merchants.FirstOrDefaultAsync(m => m.Id == id);

                return merchant is null ? Results.NotFound() : Results.Ok(merchant);
            }
        );

        app.MapPost(
            "/api/merchants",
            async (Merchant merchant, AppDbContext db) =>
            {
                merchant.Id = Guid.NewGuid();
                merchant.CreatedAt = DateTime.UtcNow;

                db.Merchants.Add(merchant);
                await db.SaveChangesAsync();

                return Results.Created($"/api/merchants/{merchant.Id}", merchant);
            }
        );
    }
}
