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
	public class RechargePlanTypeController : ControllerBase
	{
		private readonly ICrud<RechargePlanType,RechargePlanTypeResponse> _crud;
		private readonly IMapper _mapper;

		public RechargePlanTypeController(ICrud<RechargePlanType, RechargePlanTypeResponse> crud, IMapper mapper)
		{
			_crud = crud;
			_mapper = mapper;
		}

		[HttpGet]
		[Route("list")]
		public IActionResult GetAllRechargePlanType()
		{
			try
			{
				var RechargePlanTypeList = _crud.GetListItems();
				return Ok(RechargePlanTypeList);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet]
		[Route("detail/{id}")]
		public IActionResult GetRechargePlanType(int id)
		{
			try
			{
				var RechargePlanType = _crud.GetItemById(id);
				return Ok(RechargePlanType);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost]
		[Route("create")]
		public IActionResult CreateRechargePlanType([FromBody] RechargePlanTypeRequest newRechargePlanType)
		{
			try
			{
				_crud.Create(_mapper.Map<RechargePlanType>(newRechargePlanType));
				return Ok("Thanh cong");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPut]
		[Route("edit/{id}")]
		public IActionResult UpdateRechargePlanType(int id, RechargePlanTypeRequest e)
		{
			try
			{
				var ex = _mapper.Map<RechargePlanType>(e);
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
		public IActionResult DeleteRechargePlanType(int id,RechargePlanTypeRequest entity)
		{
			try
			{
				var change = _mapper.Map<RechargePlanType>(entity);
				_crud.Delete(id, change);
				return Ok("Thanh cong");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
