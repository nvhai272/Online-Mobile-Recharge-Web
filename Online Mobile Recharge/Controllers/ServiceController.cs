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
			var ServiceList = _crud.GetListItems();
			return Ok(ServiceList);
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
			catch (InvalidOperationException ex)
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
				return Ok("Service created successfully");
			}
			catch (ArgumentException ex)
			{
				return BadRequest(ex.Message);
			}
			catch (InvalidOperationException ex)
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
				return Ok("Service updated successfully");
			}
			catch (ArgumentNullException ex)
			{
				return BadRequest(ex.Message);
			}
			catch (InvalidOperationException ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPut]
		[Route("delete/{id}")]
		public IActionResult DeleteService(int id, ServiceRequestDel entity)
		{
			try
			{
				var change = _mapper.Map<Service>(entity);
				bool dele = _crud.Delete(id, change);
				return Ok("Service hidden successfully");
			}
			catch (InvalidOperationException ex)
			{
				return BadRequest(ex.Message);
			}
		}

	}
}
