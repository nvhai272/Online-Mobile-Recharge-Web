using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.Models
{
	[Table("users_payment_info")]
	public class UserPaymentInfo
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(16)]
		public int CardNumber { get; set; }

		public DateTime ModifiedAt { get; set; } = DateTime.Now;

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public bool IsDeleted { get; set; } = false;

		// khoa ngoai
		public int PaymentMethodId { get; set; }
		public virtual PaymentMethod PaymentMethod { get; set; }

		//khoa ngoai
		public int UserId { get; set; }
		public virtual User User { get; set; }

	}
}
