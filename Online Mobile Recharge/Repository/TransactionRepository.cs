using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class TransactionRepository : ICrud<Transaction>
	{
		private readonly DataContext _context;
		public TransactionRepository(DataContext context)
		{
			_context = context;
		}

		public bool Create([FromBody] Transaction entity)
		{
			Transaction newTransaction = new Transaction()
			{
				Phone = entity.Phone,
				User = entity.User,
				Service = entity.Service,
				RechargePlan = entity.RechargePlan,
				PaymentMethod = entity.PaymentMethod,
				IsSucceeded = entity.IsSucceeded,
				TransactionAmount = entity.TransactionAmount
			};
			_context.Transactions.Add(newTransaction);
			return Save();
		}

		// cập nhật field IsDeleted, chứ không xóa hẳn trong DB
		public bool Delete(int id)
		{
			try
			{
				var existedEntity = GetItemById(id);
				existedEntity.IsDeleted = true;

				_context.Transactions.Update(existedEntity);
				return Save();
			}
			catch (InvalidOperationException ex)
			{

				throw ex;
			}
		}


		public Transaction GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _context.Set<Transaction>().FirstOrDefault(e => e.Id == id);
			}
			throw new InvalidOperationException("Transaction does not existed.");
		}

		public ICollection<Transaction> GetListItems()
		{

			return _context.Set<Transaction>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList();

			// trả về tất cả danh sách 
			//return _context.Set<Transaction>().OrderBy(p => p.Id).ToList();
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
				var existedE = GetItemById(id);
				existedE.Phone = entity.Phone;
				existedE.User = entity.User;
				existedE.Service = entity.Service;
				existedE.RechargePlan = entity.RechargePlan;
				existedE.PaymentMethod = entity.PaymentMethod;
				existedE.IsSucceeded = entity.IsSucceeded;
				existedE.TransactionAmount = entity.TransactionAmount;

				existedE.ModifiedAt = DateTime.Now;
				_context.Transactions.Update(existedE);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				throw ex;
			}
		}
	}
}
