using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Request
{
	public class UserRegisterDto
	{
		public string Name { get; set; }
		public required string Password { get; set; }
		public required string Phone { get; set; }
		public string Email { get; set; }
		public DateTime Dob { get; set; }
		public string Address { get; set; }
	}

	public class UserLoginDto
	{
		public required string PhoneNumber { get; set; }
		public required string Password { get; set; }
	}

	public class UserRequest
	{
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

		public DateTime Dob { get; set; }

		[MaxLength(150)]
		public string Address { get; set; }
	}

	public class UserRequestDel
	{
		public bool IsDeleted { get; set; }
	}
}
