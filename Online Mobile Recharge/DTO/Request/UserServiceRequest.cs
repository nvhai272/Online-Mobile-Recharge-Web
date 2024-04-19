using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Request
{
	public class UserServiceRequest
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public int ServiceId { get; set; }
		public bool Status { get; set; } 
	}
}