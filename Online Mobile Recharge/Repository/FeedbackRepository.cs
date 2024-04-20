using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;
using System.Text.RegularExpressions;

namespace Online_Mobile_Recharge.Repository
{
	public class FeedbackRepository : ICrud<Feedback>
	{
		private readonly DataContext _dataContext;
		public FeedbackRepository(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		public bool IsValidPhoneNumber(string phoneNumber)
		{
			// số điện thoại không rỗng và có đúng 10 chữ số => trả về đúng 
			return !string.IsNullOrEmpty(phoneNumber) && Regex.IsMatch(phoneNumber, @"^\d{10}$");
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
				var existedFeedback = GetItemById(id);
				existedFeedback.IsDeleted = true;

				_dataContext.Feedbacks.Update(existedFeedback);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
								throw ex;
			}
		}

		public Feedback GetItemById(int id)
		{
			if (IsExisted(id))
			{
				//return _dataContext.Set<Feedback>().FirstOrDefault(x => x.Id == id);
				return _dataContext.Find<Feedback>(id);
			}
			throw new InvalidOperationException("Feedback does not existed");
		}

		public ICollection<Feedback> GetListItems()
		{
			return _dataContext.Set<Feedback>().OrderBy(p => p.Id).ToList();
			//return _context.Set<Feedback>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList();

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
				var existingFeedback = GetItemById(id);
				var existedService = _dataContext.Find<Service>(entity.Service.Id);

				if (IsValidPhoneNumber(entity.Phone) && !string.IsNullOrEmpty(entity.Content) && existedService != null)
				{
					existingFeedback.Service = entity.Service;
					existingFeedback.Content = entity.Content;
					existingFeedback.Phone = entity.Phone;
					existingFeedback.ServiceId = entity.Id;
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
