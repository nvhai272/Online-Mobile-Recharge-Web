using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Interfaces
{
	public interface ITransaction : ICrud<Transaction, TransactionResponse>
	{
		string AmountOfTheDay();
		int CountUniqueTransactionUsersOfTheDay();
		int CountTransactionsOfTheDay();
		string TotalAmount();
	}
}
