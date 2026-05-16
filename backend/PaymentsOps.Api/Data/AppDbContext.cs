using Microsoft.EntityFrameworkCore;
using PaymentsOps.Api.Models;

namespace PaymentsOps.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Merchant> Merchants => Set<Merchant>();

    public DbSet<Transaction> Transactions => Set<Transaction>();

    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
}
