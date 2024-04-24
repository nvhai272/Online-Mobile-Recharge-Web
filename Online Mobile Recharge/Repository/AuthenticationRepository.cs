using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class AuthenticationRepository : IAuthentication
	{
		private readonly DataContext _dataContext;
		private readonly IConfiguration _configuration;

		public AuthenticationRepository(DataContext dataContext, IConfiguration configuration)
		{
			_dataContext = dataContext;
			_configuration = configuration;
		}

		public string CreateToken(User user)
		{
			throw new NotImplementedException();
		}

		//public UserModifyResponse CreateUser(UserRequest request)
		//{
		//	throw new NotImplementedException();
		//}

		//public List<UserResponse> GetAllUsersAndAdmins()
		//{
		//	throw new NotImplementedException();
		//}

		//public LoginResponse Login(UserLoginDto request)
		//{
		//	throw new NotImplementedException();
		//}

		//public RegisterResponse Register(UserRegisterDto request)
		//{
		//	throw new NotImplementedException();
		//}
	}
}
