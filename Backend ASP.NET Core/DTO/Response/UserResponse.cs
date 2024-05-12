using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Response

{
	public class UserResponse
	{
		public int Id { get; set; }
		
		public string Name { get; set; }
		
		public string Password { get; set; }
		
		public string Phone { get; set; }
		
		public string Email { get; set; }

		public string Dob { get; set; }

		public string Address { get; set; }

		public string? PaymentInfo { get; set; }

		public string? NamePaymentMethod { get; set; }
	}
}
