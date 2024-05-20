using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Helper;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

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
				var existedService = _dataContext.Services.FirstOrDefault(s => s.Id == entity.ServiceId && s.IsDeleted == false);
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
					throw new InvalidOperationException("Service is not found");
				}
			}
			else
			{
				throw new ArgumentException("Please fill in all information and enter the correct 10-digit phone number");
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
				var entityResponse = Convert(_dataContext.Find<Feedback>(id));
				return entityResponse;
			}
			throw new InvalidOperationException("Feedback does not existed");
		}

		public ICollection<FeedbackResponse> GetListItems()
		{
			var feedbacks = _dataContext.Set<Feedback>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList();
			var responseList = new List<FeedbackResponse>();
			foreach (var feedback in feedbacks)
			{
				responseList.Add(Convert(feedback));
			}
			return responseList;
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
			throw new NotImplementedException();
		}

		public bool Delete(int id, Feedback entity)
		{
			var updateDelete = GetItem(id);
			// ở đây thằng GetItem có exception rồi có thể dùng lại hoặc ghi đè => chuyển code qua try/catch để bắt exception của nó 
				updateDelete.IsDeleted = entity.IsDeleted;
				_dataContext.Feedbacks.Update(updateDelete);
				return Save();
			
		}
	}
}
