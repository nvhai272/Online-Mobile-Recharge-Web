using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.DTO.Response
{
    public class PaymentMethodResponse
    {
		[Required]
		[MaxLength(100)]
		public string Name { get; set; }

		[MaxLength(255)]
		public string? Description { get; set; }

		public DateTime CreatedAt { get; set; } 

		public DateTime ModifiedAt { get; set; } 

		public bool IsDeleted { get; set; } 

		public ICollection<Transaction> Transactions { get; set; }

		public ICollection<UserPaymentInfo> User_Payment_Infos { get; set; }
	}
}
