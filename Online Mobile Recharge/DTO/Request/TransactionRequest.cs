using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Online_Mobile_Recharge.DTO.Request
{
	public class TransactionRequest
	{
		public string? Phone { get; set; }

		//public decimal TransactionAmount { get; set; }
		public bool IsSucceeded { get; set; } = false;
		public int UserId { get; set; }
		public int ServiceId { get; set; }
		public int RechargePlanId { get; set; }
		public int PaymentMethodId { get; set; }
		public bool IsDeleted { get; set; }

	}
}
