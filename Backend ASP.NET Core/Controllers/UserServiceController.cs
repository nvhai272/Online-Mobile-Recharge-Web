using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.Interfaces;

namespace Online_Mobile_Recharge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserServiceController : ControllerBase
    {
        private readonly IUserService _crud;

        public UserServiceController(IUserService crud)
        {
            _crud = crud;
        }

        [HttpGet]
        [Route("listServiceOfUser")]
        public IActionResult ServicesOfUser(int userId)
        {
            var list = _crud.ListServicesofUser(userId);
            return Ok(list);
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create(UserServiceRequest request)
        {
            var create = _crud.Create(request);
            return Ok(create);
        }

        [HttpDelete]
        [Route("delete")]
        public IActionResult DeleteUserById(UserServiceRequest request)
        {
            var delete = _crud.Delete(request);
            return Ok(delete);
        }

        [HttpPost("check-existed")]
        public ActionResult<bool> CheckExisted([FromBody] UserServiceRequest request)
        {
            var result = _crud.checkExisted(request);
            return Ok(result);
        }

    }
}
