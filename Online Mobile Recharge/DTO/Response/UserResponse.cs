using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.DTO.Response

{
	public class UserResponse
	{
		public string? Name { get; set; }
		public string? Password { get; set; }
		public string Phone { get; set; }
		public string? Email { get; set; }
		public DateTime? Dob { get; set; }
		public string? Address { get; set; }
		public int Gender { get; set; }
		public ICollection<Transaction> Transactions { get; set; }
		public ICollection<UserService> User_Service { get; set; }
		public ICollection<UserPaymentInfo> User_Payment_Infos { get; set; }
	}
}
