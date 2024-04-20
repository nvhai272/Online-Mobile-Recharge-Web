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
		private readonly ICrud<User, UserResponse> _crud;

		private readonly IMapper _mapper;

		public UserController(ICrud<User,UserResponse> crud, IMapper mapper)
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
				//var userRes = _mapper.Map<UserResponse>(userItem);
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
			catch (InvalidOperationException ex)
			{
				return Conflict(ex.Message);
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal Server Error: {ex.Message}");
			}
		}

		[HttpPut]
		[Route("edit/{id}")]
		public IActionResult UpdateUser(int id,UserRequest user)
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

		[HttpPut]
		[Route("delete/{id}")]
		public IActionResult DeleteUserById(int userId)
		{
			try
			{
				var isDeleted = _crud.Delete(userId);
				if (isDeleted)
				{
					return Ok("User deleted successfully");
				}
				else
				{
					return NotFound("User not found");
				}
			}
			catch (Exception ex)
			{
				return StatusCode(500, "An error occurred while deleting the user: " + ex.Message);
			}
		}
	}
}
