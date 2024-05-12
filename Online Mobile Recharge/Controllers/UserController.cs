using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.Models;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Exceptions;
using Online_Mobile_Recharge.DTO.Response;

namespace Online_Mobile_Recharge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser _crud;

        private readonly IMapper _mapper;


        public UserController(IUser crud, IMapper mapper)
        {
            _crud = crud;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("list")]
        public IActionResult GetUsersDetails()
        {
            var users = _crud.GetListItems();
            return Ok(users);
        }

        [HttpGet]
        [Route("detail/{id}")]
        public IActionResult GetUserById(int id)
        {
            try
            {
                var userItem = _crud.GetItemById(id);
                return Ok(userItem);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpPost]
        //[Route("create")]
        //public IActionResult CreateUser(UserRequest user)
        //{
        //    try
        //    {
        //        bool result = _crud.Create(_mapper.Map<User>(user));
        //        return Ok("User created successfully");
        //    }
        //    catch (ArgumentException ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //    catch (InvalidOperationException ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }

        //}

        [HttpPut]
        [Route("edit/{id}")]
        public IActionResult UpdateUser(int id, UserRequestEdit user)
        {
            try
            {
                var u = _mapper.Map<User>(user);
                bool updatedUser = _crud.Update(id, u);
                return Ok("Updated successfully");
            }
            catch (ArgumentException ex)
            {
                return BadRequest($"{ex.Message}");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        [Route("delete/{id}")]
        public IActionResult DeleteUserById(int id, UserRequestDel entity)
        {
            try
            {
                var u = _mapper.Map<User>(entity);
                bool dele = _crud.Delete(id, u);
                return Ok("Successful deletion");
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest($"{ex.Message}");
            }
        }

        [HttpGet]
        [Route("countNewUsersForToday")]
        public IActionResult CountNewUser()
        {
            int count = _crud.CountNewUsersOfTheDay();
            return Ok(count);
        }

        [HttpPut]
        [Route("changePassword/{id}")]
        public IActionResult UpdatePassword(int id, UserRequestChangePassword user)
        {
            try
            {
                var changePass = _crud.ChangePassword(id, _mapper.Map<User>(user));
                return Ok("Password updated success");
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

        [HttpPost]
        [Route("createUser")]
        public IActionResult CreateUserWithPaymentInfo(UserRequest user)
        {
            try
            {
                User newUser = _mapper.Map<User>(user);
               
                bool result = _crud.CreateUser(newUser);
                return Ok("Sign Up Success");
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
    }
}
