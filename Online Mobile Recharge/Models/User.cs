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

		[Required]
		[MaxLength(100)]
		public string Password { get; set; }

		[Required]
		[MaxLength(10)]
		public string Phone { get; set; }

		[MaxLength(100)]
		public string Email { get; set; }

		[Required]
		public DateTime Dob { get; set; }

		[MaxLength(150)]
		public string? Address { get; set; }

		public bool IsDeleted { get; set; } = false;

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public DateTime ModifiedAt { get; set; } = DateTime.Now;

		public string? PaymentInfo {  get; set; }

		public int? PaymentMethodId { get; set; }
        public virtual PaymentMethod PaymentMethod { get; set; }

        public virtual ICollection<Transaction> Transactions { get; set; }
		public virtual ICollection<UserService> User_Service { get; set; }

	}
}
