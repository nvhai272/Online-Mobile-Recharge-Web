using AutoMapper;
using Azure.Core;
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
			throw new InvalidOperationException("User does not existed");
		}


		public UserResponse GetItemById(int id)
		{
			if (IsExisted(id))
			{
				var getUser = Convert(_context.Users.FirstOrDefault(e => e.Id == id));
				return getUser;
			}
			throw new InvalidOperationException("User does not existed");
		}

		public bool Create([FromBody] User entity)
		{
			if (!string.IsNullOrEmpty(entity.Name) && !string.IsNullOrEmpty(entity.Address) && entity.Dob != null &&
				RegexManagement.IsValidEmail(entity.Email) && RegexManagement.IsValidPhoneNumber(entity.Phone) && RegexManagement.IsValidPassword(entity.Password))
			{
				var checkPhone = _context.Users.FirstOrDefault(u => u.Phone == entity.Phone);
				if (checkPhone == null)
				{
					var user = new User
					{
						Name = entity.Name,
						Email = entity.Email,
						Password = BCrypt.Net.BCrypt.HashPassword(entity.Password),
						Address = entity.Address,
						Dob = entity.Dob,
						Phone = entity.Phone
					};
					_context.Users.Add(user);
					return Save();
				}
				else
				{
					throw new InvalidOperationException("Phone number has been registered");
				}
			}
			else
			{
				if (string.IsNullOrEmpty(entity.Name))
				{
					throw new ArgumentException("Name cannot be left blank");
				}

				if (string.IsNullOrEmpty(entity.Address))
				{
					throw new ArgumentException("Address cannot be empty");
				}

				if (entity.Dob == null)
				{
					throw new ArgumentException("Dob cannot be left blank");
				}

				if (!RegexManagement.IsValidEmail(entity.Email))
				{
					throw new ArgumentException("Please enter a valid email. For example: abc@gmail.com");
				}

				if (!RegexManagement.IsValidPhoneNumber(entity.Phone))
				{
					throw new ArgumentException("Please enter a valid 10-digit phone number");
				}

				if (!RegexManagement.IsValidPassword(entity.Password))
				{
					throw new ArgumentException("A valid password has at least 8 characters, including 1 uppercase letter, 1 number, and 1 special character");
				}
				return false;
			}
		}

		public bool Update(int id, User entity)
		{

			var existedUser = GetItem(id);

			if (!string.IsNullOrEmpty(entity.Name) && !string.IsNullOrEmpty(entity.Address) && entity.Dob != null &&
				RegexManagement.IsValidEmail(entity.Email) && RegexManagement.IsValidPhoneNumber(entity.Phone) && RegexManagement.IsValidPassword(entity.Password))
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
					throw new InvalidOperationException("Phone number has been registered");
				}
			}
			else
			{
				if (string.IsNullOrEmpty(entity.Name))
				{
					throw new ArgumentException("Name cannot be left blank");
				}

				if (string.IsNullOrEmpty(entity.Address))
				{
					throw new ArgumentException("Address cannot be empty");
				}

				if (entity.Dob == null)
				{
					throw new ArgumentException("Dob cannot be left blank");
				}

				if (!RegexManagement.IsValidEmail(entity.Email))
				{
					throw new ArgumentException("Please enter a valid email. For example: abc@gmail.com");
				}

				if (!RegexManagement.IsValidPhoneNumber(entity.Phone))
				{
					throw new ArgumentException("Please enter a valid 10-digit phone number");
				}

				if (!RegexManagement.IsValidPassword(entity.Password))
				{
					throw new ArgumentException("A valid password has at least 8 characters, including 1 uppercase letter, 1 number, and 1 special character");
				}
				return false;
			}
		}

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

		// đổi mật khẩu 
		public bool ChangePassword(int userId, string newPassword)
		{
			if (!RegexManagement.IsValidPassword(newPassword))
			{
				throw new ArgumentException("A valid password has at least 8 characters, including 1 uppercase letter, 1 number, and 1 special character");
			}
			else
			{
				var findUserChangePassword = _context.Users.Find(userId);
				if (findUserChangePassword != null)
				{
					findUserChangePassword.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
					_context.Users.Update(findUserChangePassword);
					return Save();
				}
				else
				{
					throw new InvalidOperationException("Password update failed");
				}
			}
		}

		public bool Delete(int id, User entity)
		{
			var updateDelete = GetItem(id);
			updateDelete.IsDeleted = entity.IsDeleted;
			_context.Users.Update(updateDelete);
			return Save();
		}
	}
}