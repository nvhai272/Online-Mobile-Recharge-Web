using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class TransactionRepository : ICrud<Transaction, TransactionResponse>
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;
		public TransactionRepository(DataContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
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
				return _mapper.Map<TransactionResponse>(_context.Transactions.Find(id));
			}
			throw new InvalidOperationException("Transaction does not existed.");
		}

		public ICollection<TransactionResponse> GetListItems()
		{
			return _mapper.Map<List<TransactionResponse>>(_context.Set<Transaction>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList());
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
