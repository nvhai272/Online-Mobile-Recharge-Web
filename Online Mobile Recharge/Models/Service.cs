using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Online_Mobile_Recharge.Models
{
	[Table("services")]
	public class Service
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(100)]
		public string Name { get; set; }

		[MaxLength(255)]
		public string? Description { get; set; }

		public bool IsDeleted { get; set; } = false;

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public DateTime ModifiedAt { get; set; } = DateTime.Now;

		public virtual ICollection<UserService> User_Service { get; set; }

		public virtual ICollection<Feedback> Feedbacks { get; set; }

		public virtual ICollection<Transaction> Transactions { get; set; }

	}
}
