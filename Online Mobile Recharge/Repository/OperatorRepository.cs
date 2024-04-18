using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
	public class OperatorRepository : ICrud<Operator>
	{
		private readonly DataContext _dataContext;
		public OperatorRepository(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		public bool Create([FromBody] Operator entity)
		{
			Operator hehe = new Operator() { Name = entity.Name };
			_dataContext.Operators.Add(hehe);
			return Save();
		}

		public bool Delete(int id)
		{
			var existed = GetItemById(id);
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

		public Operator GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _dataContext.Operators.FirstOrDefault(e => e.Id == id);
			}
			throw new InvalidOperationException("Operator does not existed.");
		}

		public ICollection<Operator> GetListItems()
		{
			//return _dataContext.Set<Operator>().OrderBy(p => p.Id).ToList();
			return _dataContext.Set<Operator>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList();

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
				var existedOperator = GetItemById(id);
				existedOperator.Name = entity.Name;

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
