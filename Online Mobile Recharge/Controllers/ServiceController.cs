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
	public class ServiceController : ControllerBase
	{
		private readonly ICrud<Service, ServiceResponse> _crud;
		private readonly IMapper _mapper;

		public ServiceController(ICrud<Service, ServiceResponse> crud, IMapper mapper)
		{
			_crud = crud;
			_mapper = mapper;
		}

		[HttpGet]
		[Route("list")]
		public IActionResult GetAllService()
		{
			try
			{
				var ServiceList = _crud.GetListItems();
				return Ok(ServiceList);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet]
		[Route("detail/{id}")]
		public IActionResult GetService(int id)
		{
			try
			{
				var Service = _crud.GetItemById(id);
				return Ok(Service);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost]
		[Route("create")]
		public IActionResult CreateService([FromBody] ServiceRequest newService)
		{
			try
			{
				_crud.Create(_mapper.Map<Service>(newService));
				return Ok("Thanh cong");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPut]
		[Route("edit/{id}")]
		public IActionResult UpdateService(int id, ServiceRequest e)
		{
			try
			{
				var ex = _mapper.Map<Service>(e);
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
		public IActionResult DeleteService(int id)
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
