using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Response

{
	public class FeedbackResponse
	{
		public int Id { get; set; }
		public string Phone { get; set; }

		public string Content { get; set; }

		public string CreatedAt { get; set; } 
		public string NameService { get; set; }

	}
}
