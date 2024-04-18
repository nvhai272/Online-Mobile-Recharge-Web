using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Response

{
	public class FeedbackResponse
	{
		[Required]
		[MaxLength(10)]
		public string Phone { get; set; }

		[Required]
		[MaxLength(255)]
		public string Content { get; set; }

		public bool IsDeleted { get; set; } 

		public DateTime CreatedAt { get; set; } 

		public DateTime ModifiedAt { get; set; } 

		public Service Service { get; set; }
	}
}
