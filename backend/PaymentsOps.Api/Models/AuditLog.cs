namespace PaymentsOps.Api.Models;

public class AuditLog
{
    public Guid Id { get; set; }

    public string EntityName { get; set; } = string.Empty;

    public string Action { get; set; } = string.Empty;

    public string PerformedBy { get; set; } = "System";

    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
