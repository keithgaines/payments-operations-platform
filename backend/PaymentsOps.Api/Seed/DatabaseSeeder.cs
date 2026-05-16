using PaymentsOps.Api.Data;
using PaymentsOps.Api.Models;

namespace PaymentsOps.Api.Seed;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(AppDbContext db)
    {
        if (db.Merchants.Any())
        {
            return;
        }

        var random = new Random(42);

        var merchantNames = new[]
        {
            "Riverbend Coffee Co.",
            "Volunteer Home Goods",
            "Cumberland Fitness",
            "Music City Apparel",
            "Franklin Pet Supply",
            "Smoky Mountain Outfitters",
            "Nashville Wellness Clinic",
            "Bluebird Bakery",
            "Cedar & Oak Furniture",
            "Hermitage Auto Care",
            "Murfreesboro Market",
            "Brentwood Books",
            "615 Tech Repair",
            "Greenway Landscaping",
            "Belle Meade Boutique",
            "Rutherford Dental Group",
            "Midtown Yoga Studio",
            "Oak Ridge Electronics",
            "Hendersonville Hardware",
            "Tennessee Trail Gear",
            "East Nashville Eats",
            "Southern Event Rentals",
            "Legacy Barber Shop",
            "Capitol Print House",
            "Maple Street Pharmacy",
        };

        var statuses = new[] { "Pending", "Approved", "Under Review", "Declined" };
        var riskLevels = new[] { "Low", "Medium", "High" };
        var transactionStatuses = new[] { "Approved", "Pending", "Failed", "Refunded" };

        var merchants = merchantNames
            .Select(name => new Merchant
            {
                Id = Guid.NewGuid(),
                Name = name,
                Status = statuses[random.Next(statuses.Length)],
                RiskLevel = riskLevels[random.Next(riskLevels.Length)],
                CreatedAt = DateTime.UtcNow.AddDays(-random.Next(1, 90)),
            })
            .ToList();

        db.Merchants.AddRange(merchants);

        var transactions = new List<Transaction>();

        for (var i = 0; i < 500; i++)
        {
            var merchant = merchants[random.Next(merchants.Count)];

            transactions.Add(
                new Transaction
                {
                    Id = Guid.NewGuid(),
                    MerchantId = merchant.Id,
                    Amount = Math.Round((decimal)(random.NextDouble() * 950 + 5), 2),
                    Status = transactionStatuses[random.Next(transactionStatuses.Length)],
                    Chargeback = random.NextDouble() < 0.03,
                    CreatedAt = DateTime.UtcNow.AddDays(-random.Next(0, 60)),
                }
            );
        }

        db.Transactions.AddRange(transactions);

        db.AuditLogs.AddRange(
            new[]
            {
                new AuditLog
                {
                    Id = Guid.NewGuid(),
                    EntityName = "Merchant",
                    Action = "Merchant onboarding initiated",
                    PerformedBy = "System",
                },
                new AuditLog
                {
                    Id = Guid.NewGuid(),
                    EntityName = "Merchant",
                    Action = "Risk review assigned",
                    PerformedBy = "Risk Analyst",
                },
                new AuditLog
                {
                    Id = Guid.NewGuid(),
                    EntityName = "Transaction",
                    Action = "Transaction batch imported",
                    PerformedBy = "System",
                },
                new AuditLog
                {
                    Id = Guid.NewGuid(),
                    EntityName = "Transaction",
                    Action = "Chargeback flagged",
                    PerformedBy = "Risk Analyst",
                },
                new AuditLog
                {
                    Id = Guid.NewGuid(),
                    EntityName = "Merchant",
                    Action = "Merchant approved",
                    PerformedBy = "Operations Analyst",
                },
            }
        );

        await db.SaveChangesAsync();
    }
}
