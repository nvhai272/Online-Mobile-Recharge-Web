using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class RechargePlanTypeRepository : ICrud<RechargePlanType, RechargePlanTypeResponse>
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;
		public RechargePlanTypeRepository(DataContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public bool Create([FromBody] RechargePlanType entity)
		{
			RechargePlanType newRechargePlanType = new RechargePlanType()
			{
				Id = entity.Id,
				Name = entity.Name,
				Description = entity.Description,
				RechargePlans = entity.RechargePlans
			};
			_context.RechargePlanTypes.Add(newRechargePlanType);
			return Save();
		}

		public RechargePlanTypeResponse GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _mapper.Map<RechargePlanTypeResponse>(_context.Set<RechargePlanType>().FirstOrDefault(e => e.Id == id));
			}
			throw new InvalidOperationException("RechargePlanType does not existed.");
		}

		public RechargePlanType GetItem(int id)
		{
			if (IsExisted(id))
			{
				return _context.Set<RechargePlanType>().FirstOrDefault(e => e.Id == id);
			}
			throw new InvalidOperationException("RechargePlanType does not existed.");
		}

		public ICollection<RechargePlanTypeResponse> GetListItems()
		{
			return _mapper.Map<List<RechargePlanTypeResponse>>(_context.Set<RechargePlanType>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList());
		}

		public bool IsExisted(int id)
		{
			return _context.RechargePlanTypes.Any(e => e.Id == id && e.IsDeleted == false);
		}

		public bool Save()
		{
			var saved = _context.SaveChanges();
			return saved > 0 ? true : false;
		}

		public bool Update(int id, RechargePlanType entity)
		{
			try
			{
				var existedE = GetItem(id);
				existedE.Name = entity.Name;
				existedE.Description = entity.Description;
				existedE.RechargePlans = entity.RechargePlans;

				existedE.ModifiedAt = DateTime.Now;
				_context.RechargePlanTypes.Update(existedE);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				//  không tìm thấy mục cần cập nhật, ngoại lệ sẽ được ném ra từ hàm GetItemById
				//  có thể xử lý ngoại lệ ở đây hoặc để cho nó được truyền xuống lớp gọi
				throw ex;
			}
		}

		public bool Delete(int id, RechargePlanType entity)
		{
			var updateDelete = _context.RechargePlanTypes.Find(id);
			updateDelete.IsDeleted = entity.IsDeleted;
			_context.RechargePlanTypes.Update(updateDelete);
			return Save();
		}
	}
}
