using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class FeedbackRepository : ICrud<Feedback>
	{
		private readonly DataContext _dataContext;
		public FeedbackRepository(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		public bool Create([FromBody] Feedback entity)
		{
			Feedback feedback = new Feedback();
			feedback.Service = entity.Service;
			feedback.Content = entity.Content;
			feedback.Phone = entity.Phone;

			_dataContext.Feedbacks.Add(feedback);
			return Save();
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
				// Nếu không tìm thấy mục cần xóa, ngoại lệ sẽ được ném ra từ hàm GetItemById
				// Bạn có thể xử lý ngoại lệ ở đây hoặc để cho nó được truyền xuống lớp gọi
				throw ex;
			}
		}

		public Feedback GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _dataContext.Set<Feedback>().FirstOrDefault(x => x.Id == id);
			}
			throw new InvalidOperationException("Feedback does not existed.");
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

		public bool Update(int id, Feedback entity)
		{
			try
			{
				var existingFeedback = GetItemById(id);
				existingFeedback.Service = entity.Service;
				existingFeedback.Content = entity.Content;
				existingFeedback.Phone = entity.Phone;

				existingFeedback.ModifiedAt = DateTime.Now;

				_dataContext.Feedbacks.Update(existingFeedback);
				return Save();
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
