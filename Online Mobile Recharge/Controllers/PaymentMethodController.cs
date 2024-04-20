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
	public class PaymentMethodController : ControllerBase
	{
		private readonly ICrud<PaymentMethod, PaymentMethodResponse> _crud;
		private readonly IMapper _mapper;

		public PaymentMethodController(ICrud<PaymentMethod, PaymentMethodResponse> crud, IMapper mapper)
		{
			_crud = crud;
			_mapper = mapper;
		}

		[HttpGet]
		[Route("list")]
		public IActionResult GetAllPaymentMethod()
		{
			try
			{
				var PaymentMethodList = _crud.GetListItems();
				return Ok(PaymentMethodList);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet]
		[Route("detail/{id}")]
		public IActionResult GetPaymentMethod(int id)
		{
			try
			{
				var PaymentMethod = _crud.GetItemById(id);
				return Ok(PaymentMethod);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost]
		[Route("create")]
		public IActionResult CreatePaymentMethod([FromBody] PaymentMethodRequest newPaymentMethod)
		{
			try
			{
				_crud.Create(_mapper.Map<PaymentMethod>(newPaymentMethod));
				return Ok("Thanh cong");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPut]
		[Route("edit/{id}")]
		public IActionResult UpdatePaymentMethod(int id, PaymentMethodRequest e)
		{
			try
			{
				var ex = _mapper.Map<PaymentMethod>(e);
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
		public IActionResult DeletePaymentMethod(int id)
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
