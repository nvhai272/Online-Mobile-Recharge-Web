using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Response;
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
			if (string.IsNullOrEmpty(entity.Name))
			{
				throw new ArgumentException("Please enter complete information");
			}

			var checkExistedOperator = _dataContext.Operators.FirstOrDefault(e => e.Name == entity.Name && e.IsDeleted == false);
			if (checkExistedOperator == null)
			{
				Operator hehe = new Operator()
				{
					Name = entity.Name,
					Description = entity.Description
				};
				_dataContext.Operators.Add(hehe);
				return Save();
			}
			else
			{
				throw new InvalidOperationException("Operator already exists ");
			}
		}

		OperatorResponse ICrud<Operator, OperatorResponse>.GetItemById(int id)
		{
			if (IsExisted(id))
			{
				return _mapper.Map<OperatorResponse>(_dataContext.Operators.FirstOrDefault(e => e.Id == id));
			}
			throw new InvalidOperationException("Operator does not existed or is hidden");
		}

		public Operator GetItem(int id)
		{
			if (IsExisted(id))
			{
				return _dataContext.Operators.FirstOrDefault(e => e.Id == id);
			}
			throw new InvalidOperationException("Operator does not existed or is hidden");
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
			if (!string.IsNullOrEmpty(entity.Name))
			{
				var existingOperator = _dataContext.Operators.FirstOrDefault(s => s.Name == entity.Name && s.Id != id && s.IsDeleted == false);
				if (existingOperator == null)
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
						// ghi đè
						throw new InvalidOperationException("No object found to update");

						//hoặc dùng lại của thằng gốc
						//throw new InvalidOperationException(ex.Message,ex);
					}
				}
				else
				{
					throw new InvalidOperationException("The operator name already exists in the system");
				}
			}
			else
			{
				throw new InvalidOperationException("Enter complete information for the service that needs to be updated");
			}
		}

		public bool Delete(int id, Operator entity)
		{
			var updateDelete = GetItem(id);
			updateDelete.IsDeleted = entity.IsDeleted;
			_dataContext.Operators.Update(updateDelete);
			return Save();
			// ở đây k ném ra ngoại lệ nhưng có ngoại lệ của thằng GetItem nên là vẫn oke k cần try catch cũng đc mà?
		}
	}
}
