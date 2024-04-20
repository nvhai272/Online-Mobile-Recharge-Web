using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Online_Mobile_Recharge.Models
{
	[Table("users")]
	public class User
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(100)]
		public string Name { get; set; }

		[MaxLength(40)]
		public string Password { get; set; }

		//[Required(ErrorMessage = "Phone is required.")]
		//[RegularExpression(@"^\d{10}$", ErrorMessage = "Phone must have 10 digits.")]
		public string Phone { get; set; }

		[Required]
		[MaxLength(100)]
		public string? Email { get; set; }

		public DateTime? Dob { get; set; } 

		[MaxLength(150)]
		public string? Address { get; set; }

		public bool Gender { get; set; }

		public bool IsDeleted { get; set; } = false;

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public DateTime ModifiedAt { get; set; } = DateTime.Now;

		public virtual ICollection<Transaction> Transactions { get; set; }
		public virtual ICollection<UserService> User_Service { get; set; }
		public virtual ICollection<UserPaymentInfo> User_Payment_Infos { get; set; }

	}
}
