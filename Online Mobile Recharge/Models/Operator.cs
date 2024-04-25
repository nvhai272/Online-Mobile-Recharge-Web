using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.Models
{
	[Table("operators")]
	public class Operator
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(100)]
		public string Name { get; set; }

		public bool IsDeleted { get; set; } = false;

		[Required]
		public string Description { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public DateTime ModifiedAt { get; set; } = DateTime.Now;

		public virtual ICollection<RechargePlan> RechargePlans { get; set; }

	}
}
