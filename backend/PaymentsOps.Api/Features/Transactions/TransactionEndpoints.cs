using Microsoft.EntityFrameworkCore;
using PaymentsOps.Api.Data;

namespace PaymentsOps.Api.Features.Transactions;

public static class TransactionEndpoints
{
    public static void MapTransactionEndpoints(this WebApplication app)
    {
        app.MapGet(
            "/api/transactions",
            async (AppDbContext db) =>
            {
                var transactions = await db
                    .Transactions.Include(t => t.Merchant)
                    .OrderByDescending(t => t.CreatedAt)
                    .Take(100)
                    .ToListAsync();

                return Results.Ok(transactions);
            }
        );
    }
}
