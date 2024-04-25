using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.Models;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Exceptions;
using Online_Mobile_Recharge.DTO.Response;

namespace Online_Mobile_Recharge.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IUser _crud;

		private readonly IMapper _mapper;

		public UserController(IUser crud, IMapper mapper)
		{
			_crud = crud;
			_mapper = mapper;
		}

		[HttpGet]
		[Route("list")]
		public IActionResult GetUsersDetails()
		{
			var users = _crud.GetListItems();
			return Ok(users);
		}

		[HttpGet]
		[Route("detail/{id}")]
		public IActionResult GetUserById(int id)
		{
			try
			{
				var userItem = _crud.GetItemById(id);
				return Ok(userItem);
			}
			catch (CustomStatusException ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost]
		[Route("create")]
		public IActionResult CreateUser(UserRequest user)
		{
			try
			{
				bool result = _crud.Create(_mapper.Map<User>(user));
				return Ok("User created successfully");
			}
			catch (ArgumentException ex)
			{
				return BadRequest(ex.Message);
			}

		}

		[HttpPut]
		[Route("edit/{id}")]
		public IActionResult UpdateUser(int id, UserRequest user)
		{
			try
			{
				var u = _mapper.Map<User>(user);
				bool updatedUser = _crud.Update(id, u);
				return Ok("Updated successfully");
			}
			catch (CustomStatusException ex)
			{
				return BadRequest($"{ex.Message}");
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal Server Error: {ex.Message}");
			}

		}

		[HttpGet]
		[Route("delete/{id}")]
		public IActionResult DeleteUserById(int id, UserRequestDel entity)
		{
			try
			{
				var u = _mapper.Map<User>(entity);
				bool dele = _crud.Delete(id, u);
				return Ok("Thanh cong");
			}
			catch (CustomStatusException ex)
			{
				return BadRequest($"{ex.Message}");
			}
		}

		[HttpGet]
		[Route("countNewUsersForToday")]
		public IActionResult CountNewUser()
		{
			try
			{
				int count = _crud.CountNewUsersOfTheDay();
				return Ok(count);
			}
			catch (Exception ex)
			{
				throw ex;
			}

		}

		[HttpPut]
		[Route("changePassword/{userId}")]
		public IActionResult UpdatePassword(int userId, string newPassword)
		{
			try
			{
				var changePass = _crud.ChangePassword(userId, newPassword);
				return Ok("Thanh cong");
			}

			catch (CustomStatusException ex)
			{
				return BadRequest(ex.Message);
			}

		}
	}
}
