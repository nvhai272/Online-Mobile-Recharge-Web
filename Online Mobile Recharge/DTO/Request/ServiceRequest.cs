using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Request
{
	public class ServiceRequest
	{
		[Required]
		[MaxLength(100)]
		public string Name { get; set; }

		[MaxLength(255)]
		public string? Description { get; set; }

		//public bool IsDeleted { get; set; } 

		//public DateTime CreatedAt { get; set; } 

		//public DateTime ModifiedAt { get; set; } 

		public ICollection<UserService> User_Service { get; set; }

		public ICollection<Feedback> Feedbacks { get; set; }

		public ICollection<Transaction> Transactions { get; set; }
	}
}
