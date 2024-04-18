using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Response
{
	public class UserServiceResponse
	{
		public int Id { get; set; }

		public User User { get; set; }

		public Service Service { get; set; }

		public DateTime CreatedAt { get; set; } 

		public DateTime ModifiedAt { get; set; } 

		public bool IsDeleted { get; set; } 

		[Required]
		public bool Status { get; set; } = false;
	}
}
