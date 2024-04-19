using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Request
{
	public class ServiceRequest
	{
		public string Name { get; set; }

		public string? Description { get; set; }

		public ICollection<UserService> User_Service { get; set; }

		public ICollection<Feedback> Feedbacks { get; set; }

		public ICollection<Transaction> Transactions { get; set; }
	}
}
