using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.Exceptions;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class UserRepository : ICrud<User>
	{
		private readonly DataContext _context;
		public UserRepository(DataContext context)
		{
			_context = context;
		}

		public ICollection<User> GetListItems()
		{
			return _context.Set<User>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList();
		}

		public User GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _context.Users.FirstOrDefault(e => e.Id == id);
			}
			throw new CustomStatusException("User does not existed.");
		}

		public bool Create([FromBody] User entity)
		{
			if (string.IsNullOrEmpty(entity.Name) || string.IsNullOrEmpty(entity.Email) || string.IsNullOrEmpty(entity.Password) || entity.Dob == null || string.IsNullOrEmpty(entity.Address))
			{
				throw new ArgumentException("Điền đầy đủ thông tin!");
			}

			if (entity.Phone == null || entity.Phone.ToString().Length != 10)
			{
				throw new ArgumentException("Số điện thoại không hợp lệ!");
			}

			if (_context.Users.Any(x => x.Phone == entity.Phone))
			{
				throw new InvalidOperationException("Phone number already exists!");
			}

			var user = new User
			{
				Name = entity.Name,
				Email = entity.Email,
				Password = entity.Password,
				Address = entity.Address,
				Dob = entity.Dob,
				Gender = entity.Gender,
				Phone = entity.Phone
			};

			_context.Users.Add(user);
			return Save();
		}

		public bool Update(int id, User entity)
		{
			// chõ này phải check id tồn tại không nhỉ?
			if (IsExisted(id))
			{
				if (string.IsNullOrEmpty(entity.Name) || string.IsNullOrEmpty(entity.Email) || string.IsNullOrEmpty(entity.Password) || string.IsNullOrEmpty(entity.Address) || entity.Dob == null)
				{
					throw new CustomStatusException("Không để trống thông tin!");
				}
				else if (entity.Phone == null || entity.Phone.ToString().Length != 10)
				{
					throw new CustomStatusException("Số điện thoại không hợp lệ!");
				}
				else
				{
					if (!IsPhoneNumberExistExceptCurrent(id, entity.Phone))
					{
						var existedUser = GetItemById(id);
						existedUser.Name = entity.Name;
						existedUser.Email = entity.Email;
						existedUser.Phone = entity.Phone;
						existedUser.Address = entity.Address;
						existedUser.Dob = entity.Dob;
						existedUser.Password = entity.Password;
						existedUser.Gender = entity.Gender;

						existedUser.CreatedAt = DateTime.Now;
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
			else
			{
				throw new CustomStatusException("User does not exist");
			}
		}
		public bool IsExisted(int id)
		{
			return _context.Users.Any(e => e.Id == id && e.IsDeleted == false);
		}

		//xóa nhưng vẫn còn trong DB, chỉ là cập nhật thay đổi field trong bảng
		public bool Delete(int id)
		{
			if (IsExisted(id))
			{
				var existedUser = GetItemById(id);
				existedUser.IsDeleted = true;

				_context.Users.Update(existedUser);
				return Save();
			}
			throw new CustomStatusException("User does not existed");
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

	}
}