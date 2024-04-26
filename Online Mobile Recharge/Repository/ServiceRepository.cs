using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class ServiceRepository : ICrud<Service, ServiceResponse>
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;
		public ServiceRepository(DataContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public bool Create([FromBody] Service entity)
		{
			if (string.IsNullOrEmpty(entity.Name) || string.IsNullOrEmpty(entity.Description))
			{
				//chỗ này là Exception chung chung, có thể tách ra từng trường hợp if/else rõ ràng hơn
				throw new ArgumentException("Please enter complete information");
			}

			var checkService = _context.Services.FirstOrDefault(s => s.Name == entity.Name);

			//chỗ này nếu đã tồn tại mà xóa rồi thì k cho tạo nữa => cách giải quyết khôi phục đối tượng đã xóa vì nó vẫn còn trong DB 
			//var checkService = _context.Services.FirstOrDefault(s => s.Name == entity.Name && s.IsDeleted==false);

			if (checkService == null)
			{
				Service newService = new()
				{
					Name = entity.Name,
					Description = entity.Description
				};
				_context.Services.Add(newService);
				return Save();
			}
			else
			{
				throw new InvalidOperationException("Service already exists");
			}
		}

		public bool Delete(int id, Service entity)
		{

			var updateDelete = GetItem(id);
			updateDelete.IsDeleted = entity.IsDeleted;
			_context.Services.Update(updateDelete);
			return Save();
		}

		public Service GetItem(int id)
		{
			if (IsExisted(id))
			{
				return _context.Set<Service>().FirstOrDefault(e => e.Id == id);
			}
			throw new InvalidOperationException("Service does not existed or is hidden");
		}

		public ServiceResponse GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _mapper.Map<ServiceResponse>(_context.Set<Service>().FirstOrDefault(e => e.Id == id));
			}
			throw new InvalidOperationException("Service does not existed or is hidden");
		}

		public ICollection<ServiceResponse> GetListItems()
		{
			return _mapper.Map<List<ServiceResponse>>(_context.Set<Service>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList());
		}

		public bool IsExisted(int id)
		{
			return _context.Services.Any(e => e.Id == id && e.IsDeleted == false);
		}

		public bool Save()
		{
			var saved = _context.SaveChanges();
			return saved > 0 ? true : false;
		}

		public bool Update(int id, Service entity)
		{
			if (!string.IsNullOrEmpty(entity.Name) && !string.IsNullOrEmpty(entity.Description))
			{
				// update mấy thằng đã ẩn rồi làm gì?
				// có được trùng tên với chúng nó không?
				var existingService = _context.Services.FirstOrDefault(s => s.Name == entity.Name && s.Id != id && s.IsDeleted == false);
				if (existingService == null)
				{
					try
					{
						var existedE = GetItem(id);
						existedE.Name = entity.Name;
						existedE.Description = entity.Description;
						existedE.ModifiedAt = DateTime.Now;
						_context.Services.Update(existedE);
						return Save();
					}
					catch (InvalidOperationException ex)
					{
						// chỗ này giải thích như nào nhỉ? Ném ngoại lệ ra nhưng k xử lí lại
						// Tức là dùng lại của thằng gốc
						throw ex;
					}
				}
					throw new InvalidOperationException("The service name already exists in the system");
			}
			else
			{
				// nên đưa ra thông báo từng thông tin nhập vào thì rõ ràng hơn nhỉ?
				throw new InvalidOperationException("Enter complete information for the service that needs to be updated");
			}
		}

	}
}
