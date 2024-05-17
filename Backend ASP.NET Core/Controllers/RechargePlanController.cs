using AutoMapper;
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
		private readonly ICrud<RechargePlan, RechargePlanResponse> _crud;
		private readonly IMapper _mapper;

		public RechargePlanController(ICrud<RechargePlan, RechargePlanResponse> crud, IMapper mapper)
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
				var RechargePlanList = _crud.GetListItems();
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
				var RechargePlan = _crud.GetItemById(id);
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
				return Ok("Create a successful Recharge Plan");
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
				return Ok("Update to Recharge Plan successfully");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPut]
		[Route("delete/{id}")]
		public IActionResult DeleteRechargePlan(int id, RechargePlanRequestDel entity)
		{
			try
			{
				var change = _mapper.Map<RechargePlan>(entity);
				bool dele = _crud.Delete(id, change);
				return Ok("Successful deletion");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}
	}
}
