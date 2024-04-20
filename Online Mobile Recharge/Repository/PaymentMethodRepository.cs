using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class PaymentMethodRepository : ICrud<PaymentMethod,PaymentMethodResponse>
	{
		private readonly DataContext _context;
		private readonly IMapper _mapper;
		public PaymentMethodRepository(DataContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public bool Create([FromBody] PaymentMethod newMethod)
		{
			PaymentMethod method = new PaymentMethod();

			method.Name = newMethod.Name;
			method.Description = newMethod.Description;

			_context.PaymentMethods.Add(method);
			return Save();
		}

		public bool Delete(int id)
		{
			try
			{
				var existedMethod = GetItem(id);
				existedMethod.IsDeleted = true;

				_context.PaymentMethods.Update(existedMethod);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				//  không tìm thấy mục cần xóa, ngoại lệ sẽ được ném ra từ hàm GetItemById
				//  có thể xử lý ngoại lệ ở đây hoặc để cho nó được truyền xuống lớp gọi
				throw ex;
			}
		}

		public PaymentMethod GetItem(int id)
		{
			if (IsExisted(id))
			{
				return _context.Set<PaymentMethod>().FirstOrDefault(e => e.Id == id);
			}
			throw new InvalidOperationException("PaymentMethod does not existed.");
		}

		public PaymentMethodResponse GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _mapper.Map<PaymentMethodResponse>(_context.Set<PaymentMethod>().FirstOrDefault(e => e.Id == id));
			}
			throw new InvalidOperationException("PaymentMethod does not existed.");
		}

		public ICollection<PaymentMethodResponse> GetListItems()
		{
			return _mapper.Map<List<PaymentMethodResponse>>(_context.Set<PaymentMethod>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList());
		}

		public bool IsExisted(int id)
		{
			return _context.PaymentMethods.Any(e => e.Id == id && e.IsDeleted == false);
		}

		public bool Save()
		{
			var saved = _context.SaveChanges();
			return saved > 0 ? true : false;
		}

		public bool Update(int id, PaymentMethod entity)
		{
			try
			{
				var updateE = GetItem(id);
				updateE.Name = entity.Name;
				updateE.Description = entity.Description;

				updateE.ModifiedAt = DateTime.Now;
				_context.PaymentMethods.Update(updateE);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				//  không tìm thấy mục cần cập nhật, ngoại lệ sẽ được ném ra từ hàm GetItemById
				//  có thể xử lý ngoại lệ ở đây hoặc để cho nó được truyền xuống lớp gọi
				throw ex;
			}
		}
	}
}