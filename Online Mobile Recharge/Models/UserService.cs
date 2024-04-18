using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.Models
{
	[Table("user_service")]
	public class UserService
	{
		[Key]
		public int Id { get; set; }

		public virtual User User { get; set; }

		public virtual Service Service { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public DateTime ModifiedAt { get; set; } = DateTime.Now;

		public bool IsDeleted { get; set; } = false;

		[Required]
		public bool Status { get; set; } = false;
	}
}
