using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class RechargePlanRepository : ICrud<RechargePlan>
	{
		private readonly DataContext _context;
		public RechargePlanRepository(DataContext context)
		{
			_context = context;
		}

		public bool Create([FromBody] RechargePlan entity)
		{

			RechargePlan newRechargePlan = new RechargePlan()
			{
				Name = entity.Name,
				Operator = entity.Operator,
				Description = entity.Description,
				Price = entity.Price,
				RechargePlanType = entity.RechargePlanType,
				TalkTime = entity.TalkTime,
				DataNumberPerDay = entity.DataNumberPerDay,
				DataNumberTotal = entity.DataNumberTotal,
				TextMessageNumber = entity.TextMessageNumber,
				Validity = entity.Validity,
				Transactions = entity.Transactions


			};
			_context.RechargePlans.Add(newRechargePlan);
			return Save();
		}

		public bool Delete(int id)
		{
			try
			{
				var existedEntity = GetItemById(id);
				existedEntity.IsDeleted = true;

				_context.RechargePlans.Update(existedEntity);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				throw ex;
			}
		}

		public RechargePlan GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _context.Set<RechargePlan>().FirstOrDefault(e => e.Id == id);
			}
			throw new InvalidOperationException("RechargePlan does not existed.");
		}

		public ICollection<RechargePlan> GetListItems()
		{
			return _context.Set<RechargePlan>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList();

			// trả về tất cả danh sách 
			//return _context.Set<RechargePlan>().OrderBy(p => p.Id).ToList();
		}

		public bool IsExisted(int id)
		{
			return _context.RechargePlans.Any(e => e.Id == id && e.IsDeleted == false);
		}

		public bool Save()
		{
			var saved = _context.SaveChanges();
			return saved > 0 ? true : false;
		}

		public bool Update(int id, RechargePlan entity)
		{
			try
			{
				var existedE = GetItemById(id);
				existedE.Name = entity.Name;
				existedE.Operator = entity.Operator;
				existedE.Description = entity.Description;
				existedE.Price = entity.Price;
				existedE.RechargePlanType = entity.RechargePlanType;
				existedE.TalkTime = entity.TalkTime;
				existedE.DataNumberPerDay = entity.DataNumberPerDay;
				existedE.DataNumberTotal = entity.DataNumberTotal;
				existedE.TextMessageNumber = entity.TextMessageNumber;
				existedE.Validity = entity.Validity;
				existedE.Transactions = entity.Transactions;

				existedE.ModifiedAt = DateTime.Now;
				_context.RechargePlans.Update(existedE);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				//  không tìm thấy mục cần cập nhật, ngoại lệ sẽ được ném ra từ hàm GetItemById
				//  có thể xử lý ngoại lệ ở đây hoặc để cho nó được truyền xuống lớp gọi
				throw ex;
			}
		}
	}
}
