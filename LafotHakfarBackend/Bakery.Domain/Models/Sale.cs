namespace LafotHakfarBackend.Bakery.Domain.Models
{
    public class Sale
    {
        public DateTime Date { get; set; }
        public string BuyerName { get; set; } = string.Empty;
        public int BreadsBought { get; set; }
        public decimal AmountPaid { get; set; }
    }
}
