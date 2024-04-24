using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.Interfaces;

namespace Online_Mobile_Recharge.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		//private readonly IAuthentication _authentication;
		//public AuthController(IAuthentication authentication)
		//{
		//	_authentication = authentication;
		//}

		//[HttpPost()]
		//public IActionResult Register(UserRegisterDto request)
		//{
		//	var result = _authentication.Register(request);
		//	return Ok(result);
		//}
		//[HttpPost()]
		//public IActionResult Login(UserLoginDto request)
		//{
		//	var result = _authentication.Login(request);
		//	return Ok(result);
		//}
		//[HttpPost()]
		//public IActionResult CreateUser(UserRequest request)
		//{
		//	var result = _authentication.CreateUser(request);
		//	return Ok(result);
		//}
		//[HttpGet]
		//public IActionResult GetAllUsersAndAdmins()
		//{
		//	var result = _authentication.GetAllUsersAndAdmins();
		//	return Ok(result);
		//}
		//[HttpGet("{email}")]
		//public IActionResult GetUserByEmail(string email)
		//{
		//	var result = _authentication.GetUserByEmail(email);
		//	return Ok(result);
		//}
	}
}
