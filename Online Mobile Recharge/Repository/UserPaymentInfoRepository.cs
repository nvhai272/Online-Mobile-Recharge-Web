using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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

		public bool Create([FromBody] UserPaymentInfo entity)
		{
			UserPaymentInfo userPaymentInfo = new UserPaymentInfo()
			{
				CardNumber = entity.CardNumber,
				User = entity.User,
				PaymentMethod = entity.PaymentMethod

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
				return _mapper.Map<UserPaymentInfoResponse>(_dataContext.Set<UserPaymentInfo>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList());
			}
			throw new InvalidOperationException("User Payment Info does not existed.");
		}

		public ICollection<UserPaymentInfoResponse> GetListItems()
		{
			return _mapper.Map<List<UserPaymentInfoResponse>>(_dataContext.UserPaymentInfos.Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList());
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
				existed.CardNumber = entity.CardNumber;
				existed.ModifiedAt = DateTime.Now;
				_dataContext.UserPaymentInfos.Update(existed);
				return Save();

			}
		}
	}
}
