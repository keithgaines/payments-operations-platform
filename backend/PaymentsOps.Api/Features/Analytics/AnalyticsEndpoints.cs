using Microsoft.EntityFrameworkCore;
using PaymentsOps.Api.Data;

namespace PaymentsOps.Api.Features.Analytics;

public static class AnalyticsEndpoints
{
    public static void MapAnalyticsEndpoints(this WebApplication app)
    {
        app.MapGet(
            "/api/analytics/summary",
            async (AppDbContext db) =>
            {
                try
                {
                    var transactions = await db.Transactions.AsNoTracking().ToListAsync();

                    var totalTransactions = transactions.Count;

                    var approvedTransactions = transactions.Count(t => t.Status == "Approved");
                    var declinedTransactions = transactions.Count(t => t.Status == "Declined");
                    var pendingTransactions = transactions.Count(t => t.Status == "Pending");

                    var processedTransactions = transactions
                        .Where(t => t.Status == "Approved")
                        .ToList();

                    var totalVolume = processedTransactions.Sum(t => t.Amount);

                    var approvalRate =
                        totalTransactions == 0
                            ? 0
                            : Math.Round(
                                (decimal)approvedTransactions / totalTransactions * 100,
                                2
                            );

                    var averageTransactionAmount =
                        approvedTransactions == 0
                            ? 0
                            : Math.Round(totalVolume / approvedTransactions, 2);

                    return Results.Ok(
                        new
                        {
                            totalTransactions,
                            totalVolume,
                            averageTransactionAmount,
                            approvedTransactions,
                            declinedTransactions,
                            pendingTransactions,
                            approvalRate,
                        }
                    );
                }
                catch
                {
                    return Results.Problem(title: "Analytics summary failed");
                }
            }
        );
    }
}
