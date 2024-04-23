using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Online_Mobile_Recharge.Repository
{
	public class TransactionRepository : ITransaction
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;
		public TransactionRepository(DataContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public TransactionResponse Convert(Transaction transaction)
		{
			var nameService = _context.Services.Find(transaction.ServiceId).Name;
			var nameUser = _context.Users.Find(transaction.UserId).Name;
			var nameMethod = _context.PaymentMethods.Find(transaction.PaymentMethodId).Name;
			var nameRecharge = _context.RechargePlans.Find(transaction.RechargePlanId).Name;

			var getAmount = _context.RechargePlans.Find(transaction.RechargePlanId).Price;
			string formattedPrice = getAmount.ToString("N0") + " VND";

			var res = new TransactionResponse()
			{
				Id = transaction.Id,
				ServiceName = nameService,
				UserName = nameUser,
				RechargePlanName = nameRecharge,
				PaymentMethodName = nameMethod,
				Phone = transaction.Phone,
				TransactionAmount = formattedPrice,
				IsSucceeded = transaction.IsSucceeded
			};
			return res;
		}

		public bool Create([FromBody] Transaction entity)
		{
			var price = _context.RechargePlans.Find(entity.RechargePlanId).Price;
			var findUser = _context.Users.Find(entity.UserId);
			var findService = _context.Services.Find(entity.ServiceId);
			var findPaymentMethod = _context.PaymentMethods.Find(entity.PaymentMethodId);
			var findRechargePlan = _context.RechargePlans.Find(entity.RechargePlanId);
			Transaction newTransaction = new Transaction()
			{
				Phone = entity.Phone,

				User = findUser,
				UserId = entity.UserId,

				Service = findService,
				ServiceId = entity.ServiceId,

				RechargePlan = findRechargePlan,
				RechargePlanId = entity.RechargePlanId,

				PaymentMethod = findPaymentMethod,
				PaymentMethodId = entity.PaymentMethodId,

				IsSucceeded = entity.IsSucceeded,
				TransactionAmount = price
			};
			_context.Transactions.Add(newTransaction);
			return Save();
		}

		// cập nhật field IsDeleted, chứ không xóa hẳn trong DB
		public bool Delete(int id)
		{
			try
			{
				var existedEntity = GetItem(id);
				existedEntity.IsDeleted = true;

				_context.Transactions.Update(existedEntity);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				throw ex;
			}
		}

		public Transaction GetItem(int id)
		{
			if (IsExisted(id))
			{
				return _context.Set<Transaction>().FirstOrDefault(e => e.Id == id);
			}
			throw new InvalidOperationException("Transaction does not existed.");
		}

		public TransactionResponse GetItemById(int id)
		{
			if (IsExisted(id))
			{
				var res = Convert(_context.Transactions.Find(id));
				return res;
			}
			throw new InvalidOperationException("Transaction does not existed.");
		}

		public ICollection<TransactionResponse> GetListItems()
		{
			var getList = _context.Set<Transaction>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList();
			var list = new List<TransactionResponse>();
			foreach(var item in getList)
			{
				list.Add(Convert(item));
			}
			return list;
		}

		public bool IsExisted(int id)
		{
			return _context.Transactions.Any(e => e.Id == id && e.IsDeleted == false);
		}

		public bool Save()
		{
			var saved = _context.SaveChanges();
			return saved > 0 ? true : false;
		}

		public bool Update(int id, Transaction entity)
		{
			try
			{
				var existedE = GetItem(id);

				var findService = _context.Services.Find(entity.ServiceId);
				var findUSer = _context.Users.Find(entity.UserId);
				var findPaymentMethod = _context.PaymentMethods.Find(entity.PaymentMethodId);
				var findRechargePlan = _context.RechargePlans.Find(entity.RechargePlanId);
				var findPrice = _context.RechargePlans.Find(entity.RechargePlanId).Price;

				existedE.UserId = entity.UserId;

				existedE.ServiceId = entity.ServiceId;

				existedE.PaymentMethodId = entity.PaymentMethodId;

				existedE.RechargePlanId = entity.RechargePlanId;

				existedE.User = findUSer;

				existedE.Service = findService;

				existedE.RechargePlan = findRechargePlan;

				existedE.PaymentMethod = findPaymentMethod;

				existedE.Phone = entity.Phone;
				existedE.IsSucceeded = entity.IsSucceeded;

				existedE.TransactionAmount = findPrice;

				existedE.ModifiedAt = DateTime.Now;
				_context.Transactions.Update(existedE);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				throw ex;
			}
		}

		public string AmountOfTheDay()
		{
			decimal totalAmount = _context.Transactions
		   .Where(t => t.CreatedAt.Date == DateTime.Today)
		   .Sum(t => t.TransactionAmount);
			string formattedtotalAmount = totalAmount.ToString("N0") + " VND";
			// LINQ that la nhanh kakakakaka :)))
			return formattedtotalAmount;
		}

		// đấm số user thực hiện giao dịch
		public int CountUniqueTransactionUsersOfTheDay()
		{
			int uniqueUserCount = _context.Transactions.Where(t => t.CreatedAt.Date == DateTime.Today).Select(t => t.UserId).Distinct().Count();
			return uniqueUserCount;
		}

		// cái này làm thêm, lấy đầy đủ danh sách giao dịch
		public int CountTransactionsOfTheDay()
		{
			int transactionCount = _context.Transactions.Count(t => t.CreatedAt.Date == DateTime.Today);
			return transactionCount;
		}

		// cái này tính tổng tiên giao dịch
		public string TotalAmount()
		{
			decimal totalAmount = _context.Transactions.Sum(t => t.TransactionAmount);
			string formattedtotalAmount = totalAmount.ToString("N0") + " VND";
			return formattedtotalAmount;
		}
	}
}
