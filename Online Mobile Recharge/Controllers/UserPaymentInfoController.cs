using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserPaymentInfoController : ControllerBase
	{
		private readonly ICrud<UserPaymentInfo> _crud;
		private readonly IMapper _mapper;

		public UserPaymentInfoController(ICrud<UserPaymentInfo> crud, IMapper mapper)
		{
			_crud = crud;
			_mapper = mapper;
		}

		[HttpGet]
		[Route("list")]
		public IActionResult GetAllUserPaymentInfo()
		{
			try
			{
				//var UserPaymentInfoList = _crud.GetListItems();
				var UserPaymentInfoList = _mapper.Map<List<UserPaymentInfoResponse>>(_crud.GetListItems());
				return Ok(UserPaymentInfoList);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet]
		[Route("detail/{id}")]
		public IActionResult GetUserPaymentInfo(int id)
		{
			try
			{
				var UserPaymentInfo = _mapper.Map<UserPaymentInfoResponse>(_crud.GetItemById(id));
				return Ok(UserPaymentInfo);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost]
		[Route("create")]
		public IActionResult CreateUserPaymentInfo([FromBody] UserPaymentInfoRequest newUserPaymentInfo)
		{
			try
			{
				_crud.Create(_mapper.Map<UserPaymentInfo>(newUserPaymentInfo));
				return Ok("Thanh cong");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPut]
		[Route("edit/{id}")]
		public IActionResult UpdateUserPaymentInfo(int id, UserPaymentInfoRequest e)
		{
			try
			{
				var ex = _mapper.Map<UserPaymentInfo>(e);
				_crud.Update(id, ex);
				return Ok("Thanh cong");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPut]
		[Route("delete/{id}")]
		public IActionResult DeleteUserPaymentInfo(int id)
		{
			try
			{
				_crud.Delete(id);
				return Ok("Thanh cong");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
