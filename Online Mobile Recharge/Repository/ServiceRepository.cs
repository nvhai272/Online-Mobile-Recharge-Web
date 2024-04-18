using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class ServiceRepository : ICrud<Service>
	{
		private readonly DataContext _context;
		public ServiceRepository(DataContext context)
		{
			_context = context;
		}

		// tạo mới
		public bool Create([FromBody] Service entity)
		{
			Service newService = new Service()
			{
				Name = entity.Name,
				Description = entity.Description


			};
			_context.Services.Add(newService);
			return Save();
		}

		// cập nhật field IsDeleted, chứ không xóa hẳn trong DB
		public bool Delete(int id)
		{
			try
			{
				var existedEntity = GetItemById(id);
				existedEntity.IsDeleted = true;

				_context.Services.Update(existedEntity);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				//  không tìm thấy mục cần xóa, ngoại lệ sẽ được ném ra từ hàm GetItemById
				//  có thể xử lý ngoại lệ ở đây hoặc để cho nó được truyền xuống lớp gọi
				throw ex;
			}
		}

		// trả về đối tượng 
		public Service GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _context.Set<Service>().FirstOrDefault(e => e.Id == id);
			}
			throw new InvalidOperationException("Service does not existed.");
		}

		public ICollection<Service> GetListItems()
		{
			// trả về danh sách chưa có cột xóa là sai
			return _context.Set<Service>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList();

			// trả về tất cả danh sách 
			//return _context.Set<Service>().OrderBy(p => p.Id).ToList();
		}

		// trả về đúng hoặc sai, check theo id và cột isDeleted = false
		public bool IsExisted(int id)
		{
			return _context.Services.Any(e => e.Id == id && e.IsDeleted == false);
		}

		// lưu lại DB và trả về đúng nếu lưu lại thành công
		public bool Save()
		{
			var saved = _context.SaveChanges();
			return saved > 0 ? true : false;
		}

		public bool Update(int id, Service entity)
		{
			try
			{
				var existedE = GetItemById(id);
				existedE.Name = entity.Name;
				existedE.Description = entity.Description;

				existedE.ModifiedAt = DateTime.Now;
				_context.Services.Update(existedE);
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
