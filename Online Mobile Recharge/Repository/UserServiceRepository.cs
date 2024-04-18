using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class UserServiceRepository :ICrud<UserService>
	{
		private readonly DataContext _dataContext;
		public UserServiceRepository(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		public bool Create([FromBody] UserService entity)
		{
			UserService userService = new UserService()
			{
				Service = entity.Service,
				User = entity.User,
				Status = entity.Status
			};

			_dataContext.User_Service.Add(userService);
			return Save();
		}

		public bool Delete(int id)
		{
			try
			{
				var existedUserService = GetItemById(id);
				existedUserService.IsDeleted = true;

				_dataContext.User_Service.Update(existedUserService);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				// Nếu không tìm thấy mục cần xóa, ngoại lệ sẽ được ném ra từ hàm GetItemById
				// Bạn có thể xử lý ngoại lệ ở đây hoặc để cho nó được truyền xuống lớp gọi
				throw ex;
			}
		}

		public UserService GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _dataContext.Set<UserService>().FirstOrDefault(x => x.Id == id);
			}
			throw new InvalidOperationException("UserService does not existed.");
		}

		public ICollection<UserService> GetListItems()
		{
			return _dataContext.Set<UserService>().OrderBy(p => p.Id).ToList();
			//return _context.Set<UserService>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList();

		}

		public bool IsExisted(int id)
		{
			return _dataContext.User_Service.Any(e => e.Id == id && e.IsDeleted == false);
		}

		public bool Save()
		{
			var save = _dataContext.SaveChanges();
			return save > 0 ? true : false;
		}

		public bool Update(int id, UserService entity)
		{
			try
			{
				var existingUserService = GetItemById(id);
				existingUserService.Service = entity.Service;
				existingUserService.User = entity.User;
				existingUserService.Status = entity.Status;

				existingUserService.ModifiedAt = DateTime.Now;
				_dataContext.User_Service.Update(existingUserService);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				// Nếu không tìm thấy mục cần cập nhật, ngoại lệ sẽ được ném ra từ hàm GetItemById
				// Bạn có thể xử lý ngoại lệ ở đây hoặc để cho nó được truyền xuống lớp gọi
				throw ex;
			}


		}
	}
}
