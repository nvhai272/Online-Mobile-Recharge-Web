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
	public class OperatorController : ControllerBase
	{
		private readonly ICrud<Operator,OperatorResponse> _crud;
		private readonly IMapper _mapper;

		public OperatorController(ICrud<Operator,OperatorResponse> crud, IMapper mapper)
		{
			_crud = crud;
			_mapper = mapper;
		}

		[HttpGet]
		[Route("list")]
		public IActionResult GetAllOperator()
		{
			try
			{
				//var OperatorList = _crud.GetListItems();
				var OperatorList = _mapper.Map<List<OperatorResponse>>(_crud.GetListItems());
				return Ok(OperatorList);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet]
		[Route("detail/{id}")]
		public IActionResult GetOperator(int id)
		{
			try
			{
				var Operator = _crud.GetItemById(id);
				return Ok(Operator);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost]
		[Route("create")]
		public IActionResult CreateOperator([FromBody] OperatorRequest newOperator)
		{
			try
			{
				_crud.Create(_mapper.Map<Operator>(newOperator));
				return Ok("Thanh cong");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPut]
		[Route("edit/{id}")]
		public IActionResult UpdateOperator(int id, OperatorRequest e)
		{
			try
			{
				var ex = _mapper.Map<Operator>(e);
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
		public IActionResult DeleteOperator(int id)
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
