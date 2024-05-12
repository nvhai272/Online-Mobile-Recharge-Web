using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.DTO.Response;
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

        public User Convert(UserLoginDto user)
        {
            User user1 = new User();
            user1.Phone = user.PhoneNumber;
            user1.Password = user.Password;
            return user1;
        }


        public LoginResponse Login(UserLoginDto request)
        {
            LoginResponse loginResponse = new LoginResponse();

            if (string.IsNullOrEmpty(request.PhoneNumber) || string.IsNullOrEmpty(request.Password))
            {
                throw new InvalidOperationException("PhoneNumber and Password are required");
            }

            var res = Convert(request);
            var foundUser = _dataContext.Set<User>().SingleOrDefault(u => u.Phone == res.Phone);
            

            if (foundUser == null || !BCrypt.Net.BCrypt.Verify(res.Password, foundUser.Password))
            {
                throw new InvalidOperationException("Invalid phone number or password");
            }
            
            // Tạo token và đánh dấu đăng nhập thành công trong loginResponse
            loginResponse.Token = CreateToken(foundUser);
            loginResponse.isLogin = true;
            loginResponse.UserId = foundUser.Id;
            return loginResponse;
        }

        public string CreateToken(User user)
        {
            // Kiểm tra giá trị của token từ cấu hình
            string tokenValue = _configuration.GetSection("AppSetting:Token").Value;
            if (string.IsNullOrEmpty(tokenValue))
            {
                throw new InvalidOperationException("Token value is missing in configuration");
            }

            // Khởi tạo danh sách các Claim với thông tin của người dùng
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.MobilePhone, user.Phone),
                new Claim(ClaimTypes.Email, user.Email), // Thêm thông tin email người dùng
                new Claim(ClaimTypes.DateOfBirth, user.Dob.ToString()) // Thêm thông tin ngày sinh người dùng
            };

            // Tạo khóa từ chuỗi cấu hình
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenValue));

            // Tạo thông tin chứng thực sử dụng khóa và thuật toán HMACSHA256
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

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

    }
}