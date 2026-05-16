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

                    var totalVolume = transactions.Sum(t => t.Amount);

                    var approvedTransactions = transactions.Count(t => t.Status == "Approved");
                    var declinedTransactions = transactions.Count(t => t.Status == "Declined");
                    var pendingTransactions = transactions.Count(t => t.Status == "Pending");

                    var approvalRate =
                        totalTransactions == 0
                            ? 0
                            : Math.Round(
                                (decimal)approvedTransactions / totalTransactions * 100,
                                2
                            );

                    var averageTransactionAmount =
                        totalTransactions == 0 ? 0 : Math.Round(totalVolume / totalTransactions, 2);

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
                catch (Exception ex)
                {
                    return Results.Problem(
                        title: "Analytics summary failed",
                        detail: ex.ToString()
                    );
                }
            }
        );
    }
}
