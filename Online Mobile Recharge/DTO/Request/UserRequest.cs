using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.DTO.Request

{
	public class UserRequest
	{
		public string? Name { get; set; }
		public string? Password { get; set; }
		public string Phone { get; set; }
		public string? Email { get; set; }
		public DateTime? Dob { get; set; }
		public string? Address { get; set; }
		public int Gender { get; set; }

	}
}
