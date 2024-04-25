using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Exceptions;
using Online_Mobile_Recharge.Helper;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;
using System.Text.RegularExpressions;

namespace Online_Mobile_Recharge.Repository
{
	public class FeedbackRepository : ICrud<Feedback, FeedbackResponse>
	{
		private readonly DataContext _dataContext;
		public FeedbackRepository(DataContext dataContext)
		{
			_dataContext = dataContext;
		}

		public FeedbackResponse Convert(Feedback feedback)
		{
			var nameServiceOfFeedback = _dataContext.Services.Find(feedback.ServiceId).Name;
			string responseCreateAt = feedback.CreatedAt.ToString("yyyy-MM-dd");
			var res = new FeedbackResponse()
			{
				CreatedAt = responseCreateAt,
				Id = feedback.Id,
				Content = feedback.Content,
				Phone = feedback.Phone,
				NameService = nameServiceOfFeedback
			};
			return res;
		}

		public bool Create([FromBody] Feedback entity)
		{
			if (!string.IsNullOrEmpty(entity.Content) && RegexManagement.IsValidPhoneNumber(entity.Phone))
			{
				var existedService = _dataContext.Services.Find(entity.ServiceId);
				if (existedService != null)
				{
					Feedback feedback = new()
					{
						ServiceId = entity.ServiceId,
						Service = existedService,
						Content = entity.Content,
						Phone = entity.Phone
					};

					_dataContext.Feedbacks.Add(feedback);
					return Save();
				}
				else
				{
					throw new CustomStatusException("Không tìm thấy dịch vụ");
				}
			}
			else
			{
				throw new CustomStatusException("Vui lòng điền đầy đủ thông tin và kiểm tra số điện thoại của bạn");
			}
		}

		public Feedback GetItem(int id)
		{
			if (IsExisted(id))
			{
				return _dataContext.Set<Feedback>().FirstOrDefault(x => x.Id == id);
			}
			throw new InvalidOperationException("Feedback does not existed");
		}

		public FeedbackResponse GetItemById(int id)
		{
			if (IsExisted(id))
			{
				var res = Convert(_dataContext.Find<Feedback>(id));
				return res;
			}
			throw new InvalidOperationException("Feedback does not existed");
		}

		public ICollection<FeedbackResponse> GetListItems()
		{
			//return _dataContext.Set<Feedback>().OrderBy(p => p.Id).ToList();
			//return _context.Set<Feedback>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList();

			var feedbacks = _dataContext.Set<Feedback>().ToList();
			var responses = new List<FeedbackResponse>();

			foreach (var feedback in feedbacks)
			{
				responses.Add(Convert(feedback));
			}
			return responses;
		}

		public bool IsExisted(int id)
		{
			return _dataContext.Feedbacks.Any(e => e.Id == id && e.IsDeleted == false);
		}

		public bool Save()
		{
			var save = _dataContext.SaveChanges();
			return save > 0 ? true : false;
		}

		public bool Update(int id, Feedback entity)
		{
			try
			{
				var existingFeedback = GetItem(id);
				var existedService = _dataContext.Find<Service>(entity.ServiceId);

				if (RegexManagement.IsValidEmail(entity.Phone) && !string.IsNullOrEmpty(entity.Content) && existedService != null)
				{
					existingFeedback.Service = existedService;
					existingFeedback.Content = entity.Content;
					existingFeedback.Phone = entity.Phone;
					existingFeedback.ServiceId = entity.ServiceId;
					existingFeedback.ModifiedAt = DateTime.Now;

					_dataContext.Feedbacks.Update(existingFeedback);
					return Save();
				}
				else
				{
					return false;
				}
			}
			catch (InvalidOperationException ex)
			{
				throw ex;
			}
		}

		public bool Delete(int id, Feedback entity)
		{
			var updateDelete = _dataContext.Feedbacks.Find(id);
			updateDelete.IsDeleted = entity.IsDeleted;
			_dataContext.Feedbacks.Update(updateDelete);
			return Save();
		}
	}
}
