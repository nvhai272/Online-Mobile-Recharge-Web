using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.Models
{
	[Table("recharge_plans")]
	public class RechargePlan
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(100)]
		public string Name { get; set; }

		[MaxLength(11)]
		public int TalkTime { get; set; } = 0;

		[MaxLength(11)]
		public int? TextMessageNumber { get; set; } = 0;

		[MaxLength(11)]
		public int? DataNumberTotal { get; set; } = 0;

		[MaxLength(11)]
		public int? DataNumberPerDay { get; set; } = 0;

		[MaxLength(3)]
		public int Validity { get; set; }

		[Column(TypeName = "decimal(9,2)")]
		public decimal Price { get; set; }= 0;

		[MaxLength(255)]
		public string? Description { get; set; }

		public bool IsDeleted { get; set; } = false;

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public DateTime ModifiedAt { get; set; } = DateTime.Now;

		//khoa ngoai
		public int RechargePlanTypeId { get; set; }
		public virtual RechargePlanType RechargePlanType { get; set; }

		//khoa ngoai
		public int OperatorId { get; set; }
		public virtual Operator? Operator { get; set; }

		public virtual ICollection<Transaction> Transactions { get; set; }


	}
}
