using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Request
{
	public class UserServiceRequest
	{
		public int Id { get; set; }

		public User User { get; set; }

		public Service Service { get; set; }

		//public DateTime CreatedAt { get; set; } 

		//public DateTime ModifiedAt { get; set; } 

		//public bool IsDeleted { get; set; } 

		[Required]
		public bool Status { get; set; } = false;
	}
}
