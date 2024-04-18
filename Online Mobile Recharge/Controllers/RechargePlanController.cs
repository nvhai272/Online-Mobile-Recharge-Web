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
	public class RechargePlanController : ControllerBase
	{
		private readonly ICrud<RechargePlan> _crud;
		private readonly IMapper _mapper;

		public RechargePlanController(ICrud<RechargePlan> crud, IMapper mapper)
		{
			_crud = crud;
			_mapper = mapper;
		}

		[HttpGet]
		[Route("list")]
		public IActionResult GetAllRechargePlan()
		{
			try
			{
				//var RechargePlanList = _crud.GetListItems();
				var RechargePlanList = _mapper.Map<List<RechargePlanResponse>>(_crud.GetListItems());
				return Ok(RechargePlanList);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet]
		[Route("detail/{id}")]
		public IActionResult GetRechargePlan(int id)
		{
			try
			{
				var RechargePlan = _mapper.Map<RechargePlanResponse>(_crud.GetItemById(id));
				return Ok(RechargePlan);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost]
		[Route("create")]
		public IActionResult CreateRechargePlan([FromBody] RechargePlanRequest newRechargePlan)
		{
			try
			{
				_crud.Create(_mapper.Map<RechargePlan>(newRechargePlan));
				return Ok("Thanh cong");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPut]
		[Route("edit/{id}")]
		public IActionResult UpdateRechargePlan(int id, RechargePlanRequest e)
		{
			try
			{
				var ex = _mapper.Map<RechargePlan>(e);
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
		public IActionResult DeleteRechargePlan(int id)
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
