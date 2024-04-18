using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Request
{
    public class UserPaymentInfoRequest
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(16)]
		public int CardNumber { get; set; }

		//public DateTime ModifiedAt { get; set; } 

		//public DateTime CreatedAt { get; set; } 

		//public bool IsDeleted { get; set; } 

		public PaymentMethod PaymentMethod { get; set; }

		public User User { get; set; }
	}
}
