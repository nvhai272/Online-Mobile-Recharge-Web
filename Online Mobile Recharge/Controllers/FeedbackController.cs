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
	public class FeedbackController : ControllerBase
	{
		private readonly ICrud<Feedback> _crud;
		private readonly IMapper _mapper;

		public FeedbackController(ICrud<Feedback> crud, IMapper mapper)
		{
			_crud = crud;
			_mapper = mapper;
		}

		[HttpGet]
		[Route("list")]
		public IActionResult GetAllFeedback()
		{
			try
			{
				//var feedbackList = _crud.GetListItems();
				var feedbackList = _mapper.Map<List<FeedbackResponse>>(_crud.GetListItems());
				return Ok(feedbackList);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpGet]
		[Route("detail/{id}")]
		public IActionResult GetFeedback(int id)
		{
			try
			{
				var feedback = _mapper.Map<FeedbackResponse>(_crud.GetItemById(id));
				return Ok(feedback);
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPost]
		[Route("create")]
		public IActionResult CreateFeedback([FromBody] FeedbackRequest newFeedback)
		{
			try
			{
				_crud.Create(_mapper.Map<Feedback>(newFeedback));
				return Ok("Thanh cong");
			}
			catch (Exception ex)
			{
				return BadRequest(ex.Message);
			}
		}

		[HttpPut]
		[Route("edit/{id}")]
		public IActionResult UpdateFeedback(int id, FeedbackRequest e)
		{
			try
			{
				var ex = _mapper.Map<Feedback>(e);
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
		public IActionResult DeleteFeedback(int id)
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
