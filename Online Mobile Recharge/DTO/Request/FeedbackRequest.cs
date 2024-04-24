using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Request
{
	public class FeedbackRequest
	{
		public int ServiceId { get; set; }
		public string Phone { get; set; }
		public string Content { get; set; }
		public bool IsDeleted { get; set; }

	}
}
