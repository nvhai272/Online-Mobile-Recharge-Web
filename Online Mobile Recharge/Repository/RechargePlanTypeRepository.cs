﻿using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class RechargePlanTypeRepository : ICrud<RechargePlanType>
	{
		private readonly DataContext _context;
		public RechargePlanTypeRepository(DataContext context)
		{
			_context = context;
		}

		// tạo mới
		public bool Create([FromBody] RechargePlanType entity)
		{
			RechargePlanType newRechargePlanType = new RechargePlanType()
			{
				Name = entity.Name,
				Description = entity.Description,
				RechargePlans = entity.RechargePlans
			};
			_context.RechargePlanTypes.Add(newRechargePlanType);
			return Save();
		}

		// cập nhật field IsDeleted, chứ không xóa hẳn trong DB
		public bool Delete(int id)
		{
			try
			{
				var existedEntity = GetItemById(id);
				existedEntity.IsDeleted = true;

				_context.RechargePlanTypes.Update(existedEntity);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				//  không tìm thấy mục cần xóa, ngoại lệ sẽ được ném ra từ hàm GetItemById
				//  có thể xử lý ngoại lệ ở đây hoặc để cho nó được truyền xuống lớp gọi
				throw ex;
			}
		}

		// trả về đối tượng 
		public RechargePlanType GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _context.Set<RechargePlanType>().FirstOrDefault(e => e.Id == id);
			}
			throw new InvalidOperationException("RechargePlanType does not existed.");
		}

		public ICollection<RechargePlanType> GetListItems()
		{
			// trả về danh sách chưa có cột xóa là sai
			return _context.Set<RechargePlanType>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList();

			// trả về tất cả danh sách 
			//return _context.Set<RechargePlanType>().OrderBy(p => p.Id).ToList();
		}

		// trả về đúng hoặc sai, check theo id và cột isDeleted = false
		public bool IsExisted(int id)
		{
			return _context.RechargePlanTypes.Any(e => e.Id == id && e.IsDeleted == false);
		}

		// lưu lại DB và trả về đúng nếu lưu lại thành công
		public bool Save()
		{
			var saved = _context.SaveChanges();
			return saved > 0 ? true : false;
		}

		public bool Update(int id, RechargePlanType entity)
		{
			try
			{
				var existedE = GetItemById(id);
				existedE.Name = entity.Name;
				existedE.Description = entity.Description;
				existedE.RechargePlans = entity.RechargePlans;

				existedE.ModifiedAt = DateTime.Now;
				_context.RechargePlanTypes.Update(existedE);
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