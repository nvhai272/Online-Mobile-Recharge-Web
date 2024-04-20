using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Online_Mobile_Recharge.DTO.Response
{
    public class TransactionResponse
    {
		public string? Phone { get; set; }

		public decimal TransactionAmount { get; set; }

		public bool IsSucceeded { get; set; }

		public User User { get; set; }

		public Service? Service { get; set; }

		public RechargePlan? RechargePlan { get; set; }

		public PaymentMethod? PaymentMethod { get; set; }

	}
}
