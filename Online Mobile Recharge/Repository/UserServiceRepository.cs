using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class UserServiceRepository : ICrud<UserService, UserServiceResponse>
	{
		private readonly DataContext _dataContext;
		private readonly IMapper _mapper;
		public UserServiceRepository(DataContext dataContext, IMapper mapper)
		{
			_dataContext = dataContext;
			_mapper = mapper;
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
				var existedUserService = GetItem(id);
				existedUserService.IsDeleted = true;

				_dataContext.User_Service.Update(existedUserService);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				throw ex;
			}
		}

		public UserService GetItem(int id)
		{
			if (IsExisted(id))
			{
				return _dataContext.Set<UserService>().FirstOrDefault(x => x.Id == id);
			}
			throw new InvalidOperationException("UserService does not existed.");
		}

		public UserServiceResponse GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _mapper.Map<UserServiceResponse>(_dataContext.Set<UserService>().FirstOrDefault(x => x.Id == id));
			}
			throw new InvalidOperationException("UserService does not existed.");
		}

		public ICollection<UserServiceResponse> GetListItems()
		{
			return _mapper.Map<List<UserServiceResponse>>(_dataContext.Set<UserService>().OrderBy(p => p.Id).ToList());
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
				var existingUserService = GetItem(id);
				existingUserService.Service = entity.Service;
				existingUserService.User = entity.User;
				existingUserService.Status = entity.Status;

				existingUserService.ModifiedAt = DateTime.Now;
				_dataContext.User_Service.Update(existingUserService);
				return Save();
			}
			catch (InvalidOperationException ex)
			{

				throw ex;
			}
		}
	}
}
