using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Response
{
    public class RechargePlanResponse
    {
		public RechargePlanType RechargePlanType { get; set; }

		public Operator? Operator { get; set; }

		[Required]
		[MaxLength(100)]
		public string Name { get; set; }

		[MaxLength(11)]
		public int TalkTime { get; set; } 

		[MaxLength(11)]
		public int? TextMessageNumber { get; set; } 

		[MaxLength(11)]
		public int? DataNumberTotal { get; set; } 

		[MaxLength(11)]
		public int? DataNumberPerDay { get; set; } 

		[MaxLength(3)]
		public int Validity { get; set; }

		[Column(TypeName = "decimal(9,2)")]
		public decimal Price { get; set; } 

		[MaxLength(255)]
		public string? Description { get; set; }

		public bool IsDeleted { get; set; } = false;

		public DateTime CreatedAt { get; set; } 

		public DateTime ModifiedAt { get; set; } 

		public ICollection<Transaction> Transactions { get; set; }


	}
}
