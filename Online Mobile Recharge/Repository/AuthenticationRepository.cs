using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.IdentityModel.Tokens;
using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Exceptions;
using Online_Mobile_Recharge.Helper;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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
			// Khởi tạo danh sách các Claim với thông tin của người dùng
			List<Claim> claims = new List<Claim>
	{
		new Claim(ClaimTypes.MobilePhone, user.Phone) // Thêm số điện thoại vào danh sách Claim chỗ này chưa hiểu lắm đoạn hàm tạo token hehe
     };

			// Tạo khóa từ chuỗi cấu hình
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
				_configuration.GetSection("AppSettings:Token").Value!));

			// Tạo thông tin chứng thực sử dụng khóa và thuật toán HMACSHA512 , cái này xịn nha :))
			var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

			// Tạo mã JWT với các thông tin: danh sách các Claim, thời gian hết hạn và thông tin chứng thực
			var token = new JwtSecurityToken(
				claims: claims,
				expires: DateTime.Now.AddDays(1), // Token sẽ hết hạn sau 1 ngày
				signingCredentials: cred
				);

			// Tạo chuỗi JWT từ mã JWT
			var jwt = new JwtSecurityTokenHandler().WriteToken(token);
			return jwt;
		}

		public LoginResponse Login(UserLoginDto request)
		{
			LoginResponse loginResponse = new LoginResponse();

			if (string.IsNullOrEmpty(request.PhoneNumber) || string.IsNullOrEmpty(request.Password))
			{
				throw new CustomStatusException("PhoneNumber and Password are required");
			}

			var foundUser = _dataContext.Set<User>().SingleOrDefault(u => u.Phone == request.PhoneNumber);
				
			if (foundUser == null)
			{
				throw new CustomStatusException("User does not exist");
			}

			// Xác minh mật khẩu người nhập, mã hóa nó thành dạng một chiều và so sánh với mật khẩu mã hóa trong DB đối tượng
			if (!BCrypt.Net.BCrypt.Verify(request.Password, foundUser.Password))
			{
				throw new CustomStatusException("Wrong password");
			}

			// Tạo token và đánh dấu đăng nhập thành công trong loginResponse
			loginResponse.Token = CreateToken(foundUser);
			loginResponse.isLogin = true;

			return loginResponse;
		}



		public bool Register(UserRegisterDto request)
		{
			if (string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Password) || !RegexManagement.IsValidEmail(request.Email) || !RegexManagement.IsValidPhoneNumber(request.Phone))
			{
				if (string.IsNullOrEmpty(request.Name))
				{
					throw new Exception("Username is required");
				}
				if (string.IsNullOrEmpty(request.Password))
				{
					throw new Exception("Password is required");
				}
				if (!RegexManagement.IsValidEmail(request.Email))
				{
					throw new Exception("Email is not accepted");
				}
				if (!RegexManagement.IsValidPhoneNumber(request.Phone))
				{
					throw new Exception("Phone number is not accepted");
				}
				return false;
			}

			var existedUser = _dataContext.Set<User>().SingleOrDefault(u => u.Phone == request.Phone);
				
			if (existedUser != null)
			{
				throw new Exception("Phone number is already registered");
			}
			// Kiểm tra thêm điều kiện về Dob ở đây nếu cần thiết, hiện tại field address đang để có thể null nên không cần check cũng được

			var newUser = new User()
			{
				Name = request.Name,
				Phone = request.Phone,
				// mã hóa mật khâủ người dùng nhập vào và lưu trong DB của đối tượng
				Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
				Email = request.Email,
				Address = request.Address,
				Dob = request.Dob
			};

			_dataContext.Add(newUser);
			_dataContext.SaveChanges();
			return true;
		}

	}
}