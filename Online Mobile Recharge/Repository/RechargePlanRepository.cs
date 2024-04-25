using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class RechargePlanRepository : ICrud<RechargePlan, RechargePlanResponse>
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;
		public RechargePlanRepository(DataContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public RechargePlanResponse Convert(RechargePlan rechargePlan)
		{

			var getNameOperator = _context.Services.Find(rechargePlan.OperatorId).Name;
			var getNameRechargePlanType = _context.Services.Find(rechargePlan.RechargePlanTypeId).Name;
			var res = new RechargePlanResponse()
			{
				Id = rechargePlan.Id,
				Name = rechargePlan.Name,
				OperatorName = getNameOperator,
				Description = rechargePlan.Description,
				Price = rechargePlan.Price,
				RechargePlanTypeName = getNameRechargePlanType,
				TalkTime = rechargePlan.TalkTime,
				DataNumberPerDay = rechargePlan.DataNumberPerDay,
				DataNumberTotal = rechargePlan.DataNumberTotal,
				TextMessageNumber = rechargePlan.TextMessageNumber,
				Validity = rechargePlan.Validity
			};
			return res;
		}

		public bool Create([FromBody] RechargePlan entity)
		{
			var existedRechargePlanType = _context.RechargePlanTypes.Find(entity.RechargePlanTypeId);
			var existedOperator = _context.Operators.Find(entity.OperatorId);
			RechargePlan newRechargePlan = new RechargePlan()
			{
				Name = entity.Name,
				OperatorId = entity.OperatorId,
				Operator = existedOperator,
				Description = entity.Description,
				Price = entity.Price,
				RechargePlanTypeId = entity.RechargePlanTypeId,
				RechargePlanType = existedRechargePlanType,
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

		public bool Delete(int id, RechargePlan entity)
		{
			var updateDelete = _context.RechargePlans.Find(id);
			updateDelete.IsDeleted = entity.IsDeleted;
			_context.RechargePlans.Update(updateDelete);
			return Save();
		}

		public RechargePlan GetItem(int id)
		{
			if (IsExisted(id))
			{
				return _context.Set<RechargePlan>().FirstOrDefault(e => e.Id == id);
			}
			throw new InvalidOperationException("RechargePlan does not existed.");
		}

		public RechargePlanResponse GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _mapper.Map<RechargePlanResponse>(_context.Set<RechargePlan>().FirstOrDefault(e => e.Id == id));
			}
			throw new InvalidOperationException("RechargePlan does not existed.");
		}

		public ICollection<RechargePlanResponse> GetListItems()
		{
			return _mapper.Map<List<RechargePlanResponse>>(_context.Set<RechargePlan>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList());
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
				var existedE = _context.RechargePlans.Find(id);
				var existedRechargePlanType = _context.RechargePlanTypes.Find(entity.RechargePlanTypeId);
				var existedOperator = _context.Operators.Find(entity.OperatorId);
				existedE.Name = entity.Name;
				existedE.OperatorId = entity.OperatorId;
				existedE.Operator = existedOperator;
				existedE.RechargePlanTypeId = entity.RechargePlanTypeId;
				existedE.RechargePlanType = existedRechargePlanType;
				existedE.Description = entity.Description;
				existedE.Price = entity.Price;
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
