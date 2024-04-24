namespace Online_Mobile_Recharge.DTO.Request
{
	public class UserRegisterDto
	{
		public string? Name { get; set; }
		public string? Password { get; set; }
		public string Phone { get; set; }
		public string? Email { get; set; }
		public DateTime Dob { get; set; }
		public string? Address { get; set; }
	}

	public class UserLoginDto
	{
		public required string UserName { get; set; }
		public required string Password { get; set; }
	}

	public class UserRequest
	{
		public string? Name { get; set; }
		public string? Password { get; set; }
		public string Phone { get; set; }
		public string? Email { get; set; }
		public DateTime Dob { get; set; }
		public string? Address { get; set; }
		public bool IsDeleted { get; set; }


	}
}
