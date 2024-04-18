using Microsoft.AspNetCore.Mvc;

namespace Online_Mobile_Recharge.Interfaces
{
	public interface ICrud<E>
	{
		ICollection<E> GetListItems();
		E GetItemById(int id);
		bool Create([FromBody] E entity);
		bool Update(int id, E entity);
		bool IsExisted(int id);
		bool Delete(int id);
		bool Save();
	}
}
