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
	public class TransactionController : ControllerBase
	{
		private readonly ICrud<Transaction, TransactionResponse> _crud;
		private readonly IMapper _mapper;

		public TransactionController(ICrud<Transaction, TransactionResponse> crud, IMapper mapper)
		{
			_crud = crud;
			_mapper = mapper;
		}

		[HttpGet]
		[Route("list")]
		public IActionResult GetAllTransaction()
		{
			try
			{
				var TransactionList = _crud.GetListItems();
				return Ok(TransactionList);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet]
		[Route("detail/{id}")]
		public IActionResult GetTransaction(int id)
		{
			try
			{
				var Transaction = _crud.GetItemById(id);
				return Ok(Transaction);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost]
		[Route("create")]
		public IActionResult CreateTransaction([FromBody] TransactionRequest newTransaction)
		{
			try
			{
				_crud.Create(_mapper.Map<Transaction>(newTransaction));
				return Ok("Thanh cong");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPut]
		[Route("edit/{id}")]
		public IActionResult UpdateTransaction(int id, TransactionRequest e)
		{
			try
			{
				var ex = _mapper.Map<Transaction>(e);
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
		public IActionResult DeleteTransaction(int id)
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
