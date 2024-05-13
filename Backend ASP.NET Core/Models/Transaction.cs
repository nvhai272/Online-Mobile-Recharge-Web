using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Online_Mobile_Recharge.Models
{
	[Table("transactions")]
	public class Transaction
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(10)]
		public string Phone { get; set; }

		[Column(TypeName = "decimal(9, 2)")]
		public decimal TransactionAmount { get; set; } = 0;

		[Column(TypeName = "decimal(9, 2)")]
		public decimal RechargePlanPrice { get; set; } = 0;
		
        [Column(TypeName = "decimal(9, 2)")]
        public decimal DiscountAmount { get; set; } = 0;

        public bool IsSucceeded { get; set; }

		public bool IsDeleted { get; set; } = false;

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public DateTime ModifiedAt { get; set; } = DateTime.Now;

		//khoa ngoai
		public int? UserId { get; set; } 
		public virtual User User { get; set; }

		//khoa ngoai
		public int ServiceId { get; set; }
		public virtual Service Service { get; set; }

		//khoa ngoai
		public int? RechargePlanId { get; set; }
		public virtual RechargePlan RechargePlan { get; set; }

		//khoa ngoai
		public int PaymentMethodId { get; set; } 
		public virtual PaymentMethod PaymentMethod { get; set; }

	}
}
