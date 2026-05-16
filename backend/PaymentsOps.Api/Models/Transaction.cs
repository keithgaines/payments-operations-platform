namespace PaymentsOps.Api.Models;

public class Transaction
{
    public Guid Id { get; set; }

    public Guid MerchantId { get; set; }

    public decimal Amount { get; set; }

    public string Status { get; set; } = "Approved";

    public bool Chargeback { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Merchant? Merchant { get; set; }
}
