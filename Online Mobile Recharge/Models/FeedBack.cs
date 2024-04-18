using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.Models
{
	[Table("feedbacks")]
	public class Feedback
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(10)]
		public string Phone { get; set; }

		[Required]
		[MaxLength(255)]
		public string Content { get; set; }

		public bool IsDeleted { get; set; } = false;

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public DateTime ModifiedAt { get; set; } = DateTime.Now;

		public virtual Service Service { get; set; }
	}
}
