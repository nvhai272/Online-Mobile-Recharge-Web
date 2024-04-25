using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Exceptions;
using Online_Mobile_Recharge.Helper;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;
using System.Text.RegularExpressions;

namespace Online_Mobile_Recharge.Repository
{
	public class UserRepository : IUser
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;
		public UserRepository(DataContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public UserResponse Convert(User e)
		{
			DateTime dateTime = e.Dob;
			string dateString = dateTime.ToString("yyyy-MM-dd");

			UserResponse res = new UserResponse()
			{
				Id = e.Id,
				Name = e.Name,
				Email = e.Email,
				Password = e.Password,
				Address = e.Address,
				Dob = dateString,
				Phone = e.Phone
			};
			return res;
		}

		public ICollection<UserResponse> GetListItems()
		{
			var userRes = _context.Set<User>()
				.Where(p => p.IsDeleted == false)
				.OrderBy(p => p.Id).ToList();
			var responses = new List<UserResponse>();
			foreach (var item in userRes)
			{
				responses.Add(Convert(item));
			}
			return responses;
		}

		public User GetItem(int id)
		{
			if (IsExisted(id))
			{
				return _context.Users.FirstOrDefault(e => e.Id == id);
			}
			throw new CustomStatusException("User does not existed.");
		}


		public UserResponse GetItemById(int id)
		{
			if (IsExisted(id))
			{
				var getUser = Convert(_context.Users.FirstOrDefault(e => e.Id == id));
				return getUser;
			}
			throw new CustomStatusException("Người dùng không tồn tại");
		}

		public bool Create([FromBody] User entity)
		{
			var user = new User
			{
				Name = entity.Name,
				Email = entity.Email,
				Password = entity.Password,
				Address = entity.Address,
				Dob = entity.Dob,
				Phone = entity.Phone,
			};
			_context.Users.Add(user);
			return Save();
		}

		public bool Update(int id, User entity)
		{
			try
			{
				var existedUser = GetItem(id);

				if (string.IsNullOrEmpty(entity.Name) || string.IsNullOrEmpty(entity.Email) || string.IsNullOrEmpty(entity.Address) || entity.Dob == null)
				{
					throw new CustomStatusException("Không để trống thông tin!");
				}
				else if (!RegexManagement.IsValidPhoneNumber(entity.Phone))
				{
					throw new CustomStatusException("Số điện thoại không hợp lệ!");
				}
				else
				{
					if (!IsPhoneNumberExistExceptCurrent(id, entity.Phone))
					{
						existedUser.Name = entity.Name;
						existedUser.Email = entity.Email;
						existedUser.Phone = entity.Phone;
						existedUser.Address = entity.Address;
						existedUser.Dob = entity.Dob;
						existedUser.ModifiedAt = DateTime.Now;
						_context.Users.Update(existedUser);
						return Save();
					}
					else
					{
						throw new CustomStatusException("Số điện thoại đã tồn tại trong cơ sở dữ liệu");
					}
				}
			}
			catch (CustomStatusException)
			{
				throw;
				// Ném lại ngoại lệ để xử lý ở lớp gọi
			}
			catch (Exception)
			{
				throw new CustomStatusException("Có lỗi xảy ra trong quá trình cập nhật");
			}
		}

		//check tồn tại với cột IsDeleted == false
		public bool IsExisted(int id)
		{
			return _context.Users.Any(e => e.Id == id && e.IsDeleted == false);
		}

		public bool Save()
		{
			var saved = _context.SaveChanges();
			return saved > 0 ? true : false;
		}

		public bool IsPhoneNumberExistExceptCurrent(int id, string phoneNumber)
		{
			return _context.Users.Any(u => u.Id != id && u.Phone == phoneNumber);
		}

		// đếm số users mới tạo tài khoản trong ngày
		public int CountNewUsersOfTheDay()
		{
			var listUser = _context.Users.Where(u => u.CreatedAt.Date == DateTime.Today).ToList();
			int countUser = listUser.Count();
			return countUser;
		}

		// chỗ này chưa có mã hóa phải sửa
		public bool ChangePassword(int userId, string newPassword)
		{
			if (IsExisted(userId))
			{
				var findUserChangePassword = _context.Users.Find(userId);
				findUserChangePassword.Password = newPassword;
				_context.Users.Update(findUserChangePassword);
				return Save();
			}
			throw new CustomStatusException("Mat khau cap nhat ko thanh cong");
		}

		public bool Delete(int id, User entity)
		{
			var updateDelete = _context.Users.Find(id);
			updateDelete.IsDeleted = entity.IsDeleted;
			_context.Users.Update(updateDelete);
			return Save();
		}
	}
}