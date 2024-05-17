using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Interfaces
{
    public interface ITransaction : ICrud<Transaction, TransactionResponse>
    {
        int AmountOfTheDay();
        int CountUniqueTransactionUsersOfTheDay();
        int CountTransactionsOfTheDay();
        int TotalAmount();
        // lấy danh sách giao dịch của 1 user
        List<TransactionResponse> GetTransactionByUserId(int userId);
        //phân trang bất đồng bộ
        Task<int> CountRecordsAsync();
        Task<IEnumerable<TransactionResponse>> GetTransactionsPagedAsync(int page, int perPage);
    }

}

