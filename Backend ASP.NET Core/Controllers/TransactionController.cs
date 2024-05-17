using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransaction _crud;
        private readonly IMapper _mapper;

        public TransactionController(ITransaction crud, IMapper mapper)
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
                return Ok("Successful transaction");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("totalAmountForToday")]
        public IActionResult GetAmountOfTheDay()
        {
            int totalAmount = _crud.AmountOfTheDay();

            return Ok(totalAmount);
        }

        [HttpGet]
        [Route("countTransactionsOfTheDay")]
        public IActionResult CountTransactionOfTheDay()
        {
            int count = _crud.CountTransactionsOfTheDay();

            return Ok(count);
        }


        [HttpGet]
        [Route("countUniqueTransactionUsersForToday")]
        public IActionResult CountUniqueTransactionUsers()
        {
            int count = _crud.CountUniqueTransactionUsersOfTheDay();

            return Ok(count);
        }

        [HttpGet]
        [Route("totalTransactionAmount")]
        public IActionResult totalTransactionAmount()
        {
            int totalAmount = _crud.TotalAmount();

            return Ok(totalAmount);
        }

        [HttpGet]
        [Route("transactionOfUser/{id}")]
        public IActionResult listTransactionOfUser(int id)
        {
            var getList = _crud.GetTransactionByUserId(id);
            return Ok(getList);
        }

        [HttpGet]
        public IActionResult GetTransactions([FromQuery] int page = 0, [FromQuery] int perPage = 10)
        {
            try
            {
                var items = _crud.GetListItems();
                int totalItems = items.Count;
                int totalPages = (int)Math.Ceiling((double)totalItems / perPage);

                int start = page * perPage;
                int end = Math.Min(start + perPage, totalItems);

                var result = new
                {
                    items = items.Skip(start).Take(end - start).ToList(),
                    total = totalItems,
                    page = page,
                    perPage = perPage,
                    totalPages = totalPages
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

    }
}
