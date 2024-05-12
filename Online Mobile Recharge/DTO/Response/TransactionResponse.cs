using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Online_Mobile_Recharge.DTO.Response
{
    public class TransactionResponse
    {
		public int Id { get; set; }
			
		public string? Phone { get; set; }

		public string TransactionAmount { get; set; }

		public string DiscountAmount { get; set; }

		public string RechargePlanPrice { get; set; }

		public bool IsSucceeded { get; set; }

		//public User User { get; set; }
		public string? UserName { get; set; }

		//public Service? Service { get; set; }
		public string? ServiceName { get; set; } 

		//public RechargePlan? RechargePlan { get; set; }
		public string? RechargePlanName { get; set; }

		//public PaymentMethod? PaymentMethod { get; set; }
		public string? PaymentMethodName { get; set; }

		public string CreatedAt { get; set; }
	}
}
