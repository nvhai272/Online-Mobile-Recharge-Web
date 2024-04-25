using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Response

{
	public class UserResponse
	{
		public int Id { get; set; }

		[MaxLength(100)]
		public string Name { get; set; }

		[Required]
		[MaxLength(50)]
		public string Password { get; set; }

		[Required]
		public string Phone { get; set; }

		[Required]
		[MaxLength(100)]
		public string Email { get; set; }

		public string Dob { get; set; }

		[MaxLength(150)]
		public string Address { get; set; }
	}
}
