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
                    var totalTransactions = await db.Transactions.CountAsync();

                    var totalVolume =
                        await db.Transactions.Select(t => (decimal?)t.Amount).SumAsync() ?? 0m;

                    var approvedTransactions = await db.Transactions.CountAsync(t =>
                        t.Status == "Approved"
                    );

                    var declinedTransactions = await db.Transactions.CountAsync(t =>
                        t.Status == "Declined"
                    );

                    var pendingTransactions = await db.Transactions.CountAsync(t =>
                        t.Status == "Pending"
                    );

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
