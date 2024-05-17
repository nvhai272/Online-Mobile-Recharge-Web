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
    public class FeedbackController : ControllerBase
    {
        private readonly ICrud<Feedback, FeedbackResponse> _crud;
        private readonly IMapper _mapper;

        public FeedbackController(ICrud<Feedback, FeedbackResponse> crud, IMapper mapper)
        {
            _crud = crud;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("list")]
        public IActionResult GetAllFeedback()
        {
            var feedbackList = _crud.GetListItems();
            return Ok(feedbackList);
        }

        [HttpGet]
        [Route("detail/{id}")]
        public IActionResult GetFeedback(int id)
        {
            try
            {
                var feedback = _crud.GetItemById(id);
                return Ok(feedback);
            }
            catch (InvalidOperationException ex)
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
                return Ok("Successful review");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("delete/{id}")]
        public IActionResult DeleteFeedback(int id, FeedbackRequestDel entity)
        {
            try
            {
                var change = _mapper.Map<Feedback>(entity);
                _crud.Delete(id, change);
                return Ok("Feedback successfully deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

