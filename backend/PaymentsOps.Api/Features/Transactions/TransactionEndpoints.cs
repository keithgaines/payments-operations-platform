using Microsoft.EntityFrameworkCore;
using PaymentsOps.Api.Data;

namespace PaymentsOps.Api.Features.Transactions;

public static class TransactionEndpoints
{
    public static void MapTransactionEndpoints(this WebApplication app)
    {
        app.MapGet(
            "/api/transactions",
            async (
                AppDbContext db,
                string? status,
                Guid? merchantId,
                decimal? minAmount,
                decimal? maxAmount,
                DateTime? startDate,
                DateTime? endDate
            ) =>
            {
                var query = db.Transactions.Include(t => t.Merchant).AsQueryable();

                if (!string.IsNullOrWhiteSpace(status))
                {
                    query = query.Where(t => t.Status == status);
                }

                if (merchantId.HasValue)
                {
                    query = query.Where(t => t.MerchantId == merchantId.Value);
                }

                if (minAmount.HasValue)
                {
                    query = query.Where(t => t.Amount >= minAmount.Value);
                }

                if (maxAmount.HasValue)
                {
                    query = query.Where(t => t.Amount <= maxAmount.Value);
                }

                if (startDate.HasValue)
                {
                    query = query.Where(t => t.CreatedAt >= startDate.Value);
                }

                if (endDate.HasValue)
                {
                    query = query.Where(t => t.CreatedAt <= endDate.Value);
                }

                var transactions = await query
                    .OrderByDescending(t => t.CreatedAt)
                    .Take(100)
                    .ToListAsync();

                return Results.Ok(transactions);
            }
        );
    }
}
