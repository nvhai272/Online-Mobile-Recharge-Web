using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class UserPaymentInfoReposity : ICrud<UserPaymentInfo, UserPaymentInfoResponse>
	{
		private readonly DataContext _dataContext;
		private readonly IMapper _mapper;

		public UserPaymentInfoReposity(DataContext dataContext, IMapper mapper)
		{
			_dataContext = dataContext;
			_mapper = mapper;
		}

		public UserPaymentInfoResponse Convert(UserPaymentInfo e)
		{
			var getUser = _dataContext.Users.Find(e.UserId).Name;
			var getPaymentMethod = _dataContext.PaymentMethods.Find(e.PaymentMethodId).Name;

			var res = new UserPaymentInfoResponse()
			{
				Id = e.Id,
				CardNumber = e.CardNumber,
				UserName = getUser,
				PaymentMethodName = getPaymentMethod
			};
			return res;
		}

		public bool Create([FromBody] UserPaymentInfo entity)
		{
			var findUser = _dataContext.Users.Find(entity.UserId);
			var findPaymentMethod = _dataContext.PaymentMethods.Find(entity.PaymentMethodId);


			UserPaymentInfo userPaymentInfo = new UserPaymentInfo()
			{
				UserId = entity.UserId,
				PaymentMethodId = entity.PaymentMethodId,

				CardNumber = entity.CardNumber,
				User = findUser,
				PaymentMethod = findPaymentMethod

			};

			_dataContext.UserPaymentInfos.Add(userPaymentInfo);
			return Save();
		}

		public bool Delete(int id)
		{
			if (IsExisted(id))
			{
				var existed = GetItem(id);
				existed.IsDeleted = true;

				_dataContext.UserPaymentInfos.Update(existed);
				return Save();
			}
			throw new InvalidOperationException("User Payment Info does not existed.");
		}

		public UserPaymentInfo GetItem(int id)
		{
			if (IsExisted(id))
			{
				return _dataContext.UserPaymentInfos.FirstOrDefault(e => e.Id == id);
			}
			throw new InvalidOperationException("User Payment Info does not existed.");
		}

		public UserPaymentInfoResponse GetItemById(int id)
		{
			if (IsExisted(id))
			{
				var getUserPaymentInfo = _dataContext.UserPaymentInfos.Find(id);
				var res = Convert(getUserPaymentInfo);
				return res;
			}
			throw new InvalidOperationException("User Payment Info does not existed.");
		}

		public ICollection<UserPaymentInfoResponse> GetListItems()
		{
			var listUserPaymentInfo = _dataContext.UserPaymentInfos.Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList();
			var listRes = new List<UserPaymentInfoResponse>();

			foreach (var item in listUserPaymentInfo)
			{
				listRes.Add(Convert(item));
			}
			return listRes;
		}

		public bool IsExisted(int id)
		{
			return _dataContext.Services.Any(e => e.Id == id && e.IsDeleted == false);
		}

		public bool Save()
		{
			var saved = _dataContext.SaveChanges();
			return saved > 0 ? true : false;
		}

		public bool Update(int id, UserPaymentInfo entity)
		{
			if (!IsExisted(id))
			{
				throw new InvalidOperationException("Khong ton tai thong tin thanh toan khach hang");
			}
			else
			{
				var existed = GetItem(id);
				var findUser = _dataContext.Users.Find(entity.UserId);
				var findPaymentMethod = _dataContext.PaymentMethods.Find(entity.PaymentMethodId);

				existed.PaymentMethodId = entity.PaymentMethodId;
				existed.PaymentMethod = findPaymentMethod;

				existed.UserId = entity.UserId;
				existed.User = findUser;

				existed.CardNumber = entity.CardNumber;

				existed.ModifiedAt = DateTime.Now;
				_dataContext.UserPaymentInfos.Update(existed);
				return Save();

			}
		}
	}
}
