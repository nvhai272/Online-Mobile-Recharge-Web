using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.Models
{
	[Table("payment_methods")]
	public class PaymentMethod
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(100)]
		public string Name { get; set; }

		[Required]
		[MaxLength(255)]
		public string Description { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public DateTime ModifiedAt { get; set; } = DateTime.Now;

		public bool IsDeleted { get; set; } = false;

		public virtual ICollection<Transaction> Transactions { get; set; }

		public virtual ICollection<UserPaymentInfo>  User_Payment_Infos { get; set; }

	}
}