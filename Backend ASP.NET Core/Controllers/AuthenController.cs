using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.Interfaces;

namespace Online_Mobile_Recharge.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthenController : ControllerBase
    {
        private readonly IAuthentication _authentication;

        public AuthenController(IAuthentication authentication)
        {
            _authentication = authentication;
        }

        // đăng nhập và tạo token check tài khoản
        [HttpPost("login")]
        public IActionResult Login(UserLoginDto request)
        {
            try
            {
                var result = _authentication.Login(request);
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
