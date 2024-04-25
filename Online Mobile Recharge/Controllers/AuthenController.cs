using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.Interfaces;

namespace Online_Mobile_Recharge.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthenController : ControllerBase
	{

		//private readonly IAuthentication _authentication;
		//public AuthenController(IAuthentication authentication)
		//{
		//	_authentication = authentication;
		//}

		//[HttpPost("register")]
		//public IActionResult Register(UserRegisterDto request)
		//{
		//	var result = _authentication.Register(request);
		//	return Ok(result);
		//}

		//[HttpPost("login")]
		//public IActionResult Login(UserLoginDto request)
		//{
		//	var result = _authentication.Login(request);
		//	return Ok(result);
		//}

	}
}
