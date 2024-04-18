using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Online_Mobile_Recharge.DTO.Response
{
    public class TransactionResponse
    {
		[Required]
		[StringLength(10)]
		public string? Phone { get; set; }

		[Column(TypeName = "decimal(9, 2)")]
		public decimal TransactionAmount { get; set; }

		[Required]
		public bool IsSucceeded { get; set; }

		[Required]
		public bool IsDeleted { get; set; } 

		public DateTime CreatedAt { get; set; } 

		public DateTime ModifiedAt { get; set; } 

		public User User { get; set; }

		public Service? Service { get; set; }

		public RechargePlan? RechargePlan { get; set; }

		public PaymentMethod? PaymentMethod { get; set; }

	}
}
