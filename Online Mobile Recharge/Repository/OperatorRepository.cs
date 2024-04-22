using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Exceptions;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class OperatorRepository : ICrud<Operator, OperatorResponse>
	{
		private readonly DataContext _dataContext;
		private readonly IMapper _mapper;
		public OperatorRepository(DataContext dataContext, IMapper mapper)
		{
			_dataContext = dataContext;
			_mapper = mapper;
		}

		public bool Create([FromBody] Operator entity)
		{
			var check = _dataContext.Operators.FirstOrDefault(e => e.Name == entity.Name);
			if (check == null)
			{
				Operator hehe = new Operator() { Name = entity.Name ,Description=entity.Description};
				_dataContext.Operators.Add(hehe);
				return Save();
			}
			else
			{
				throw new CustomStatusException("Da ton tai");
			}
		}

		public bool Delete(int id)
		{
			var existed = GetItem(id);
			if (existed != null)
			{
				_dataContext.Operators.Remove(existed);
				return Save();
			}
			return false;


			//try
			//{
			//	var existed = GetItemById(id);
			//	existed.IsDeleted = true;

			//	_dataContext.Operators.Update(existed);
			//	return Save();
			//}
			//catch (InvalidOperationException ex)
			//{
			//	throw ex;
			//}
		}

		OperatorResponse ICrud<Operator, OperatorResponse>.GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _mapper.Map<OperatorResponse>(_dataContext.Operators.FirstOrDefault(e => e.Id == id));
			}
			throw new InvalidOperationException("Operator does not existed");
		}

		public Operator GetItem(int id)
		{
			if (IsExisted(id))
			{
				return _dataContext.Operators.FirstOrDefault(e => e.Id == id);
			}
			throw new InvalidOperationException("Operator does not existed");
		}

		public ICollection<OperatorResponse> GetListItems()
		{
			return _mapper.Map<List<OperatorResponse>>(
				_dataContext.Set<Operator>()
					.Where(p => !p.IsDeleted)
					.OrderBy(p => p.Id)
					.ToList()
			);

		}

		public bool IsExisted(int id)
		{
			return _dataContext.Operators.Any(e => e.Id == id && e.IsDeleted == false);
		}

		public bool Save()
		{
			var save = _dataContext.SaveChanges();
			return save > 0 ? true : false;
		}

		public bool Update(int id, Operator entity)
		{
			try
			{
				var existedOperator = GetItem(id);
				existedOperator.Name = entity.Name;
				existedOperator.Description = entity.Description;

				existedOperator.ModifiedAt = DateTime.Now;
				_dataContext.Operators.Update(existedOperator);
				return Save();
			}
			catch (InvalidOperationException ex)
			{
				throw ex;
			}
		}


	}
}
