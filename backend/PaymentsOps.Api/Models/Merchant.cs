namespace PaymentsOps.Api.Models;

public class Merchant
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Status { get; set; } = "Pending";

    public string RiskLevel { get; set; } = "Low";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
