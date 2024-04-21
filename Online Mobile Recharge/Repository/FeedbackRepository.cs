using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Response;
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
		public bool IsValidPhoneNumber(string phoneNumber)
		{
			return !string.IsNullOrEmpty(phoneNumber) && Regex.IsMatch(phoneNumber, @"^\d{10}$");
		}

		public FeedbackResponse Convert(Feedback feedback)
		{
			var nameService = _dataContext.Services.Find(feedback.ServiceId).Name;
			var res = new FeedbackResponse()
			{
				Content = feedback.Content,
				Phone = feedback.Phone,
				NameService = nameService
			};
			return res;
		}

		public bool Create([FromBody] Feedback entity)
		{
			if (!string.IsNullOrEmpty(entity.Content) && IsValidPhoneNumber(entity.Phone))
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
					throw new Exception("Không tìm thấy dịch vụ");
				}
			}
			else
			{
				throw new Exception("Vui lòng điền đầy đủ thông tin phản hồi bao gồm số điện thoại 10 chữ số");
			}
		}

		public bool Delete(int id)
		{
			try
			{
				var existedFeedback = GetItem(id);
				existedFeedback.IsDeleted = true;

				_dataContext.Feedbacks.Update(existedFeedback);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				throw ex;
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

		// feedback có cho update không?
		public bool Update(int id, Feedback entity)
		{
			try
			{
				var existingFeedback = GetItem(id);
				var existedService = _dataContext.Find<Service>(entity.ServiceId);

				if (IsValidPhoneNumber(entity.Phone) && !string.IsNullOrEmpty(entity.Content) && existedService != null)
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
				// Nếu không tìm thấy mục cần cập nhật, ngoại lệ sẽ được ném ra từ hàm GetItemById
				// Bạn có thể xử lý ngoại lệ ở đây hoặc để cho nó được truyền xuống lớp gọi
				throw ex;
			}
		}

	}
}
