using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Helper;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
    public class TransactionRepository : ITransaction
    {
        private readonly DataContext _context;

        public TransactionRepository(DataContext context)
        {
            _context = context;
        }

        public TransactionResponse Convert(Transaction transaction)
        {
            var service = _context.Services.Find(transaction.ServiceId);
            var user = _context.Users.Find(transaction.UserId);
            var paymentMethod = _context.PaymentMethods.Find(transaction.PaymentMethodId);
            var rechargePlan = transaction.RechargePlanId != null ? _context.RechargePlans.Find(transaction.RechargePlanId) : null;

            var rechargePlanPrice = rechargePlan?.Price ?? 0;
            string formattedPrice = rechargePlanPrice.ToString("N0") + " VND";
            string amount = transaction.TransactionAmount.ToString("N0") + " VND";
            string discount = transaction.DiscountAmount.ToString("N0") + " VND";

            var createdAt = transaction.CreatedAt.Date.ToString("yyyy-MM-dd");

            var res = new TransactionResponse()
            {
                Id = transaction.Id,
                ServiceName = service?.Name,
                UserName = user?.Name,
                RechargePlanName = rechargePlan?.Name,
                PaymentMethodName = paymentMethod?.Name,
                Phone = transaction.Phone,
                RechargePlanPrice = formattedPrice,
                TransactionAmount = amount,
                DiscountAmount = discount,
                IsSucceeded = transaction.IsSucceeded,
                CreatedAt = createdAt
            };
            return res;
        }


        public bool Create([FromBody] Transaction entity)
        {
            if (!RegexManagement.IsValidPhoneNumber(entity.Phone) || entity.ServiceId == null || entity.PaymentMethodId == null)
            {
                if (!RegexManagement.IsValidPhoneNumber(entity.Phone))
                {
                    throw new ArgumentException("Phone number is not correct");
                }
                if (entity.ServiceId == null)
                {
                    throw new ArgumentException("Service ID is required");
                }
                if (entity.PaymentMethodId == null)
                {
                    throw new ArgumentException("Payment method ID is required");
                }
                return false;
            }
            else
            {
                var price = entity.RechargePlanId != null ? _context.RechargePlans.Find(entity.RechargePlanId)?.Price ?? 0 : entity.RechargePlanPrice;

                var findService = _context.Services.Find(entity.ServiceId);
                var findPaymentMethod = _context.PaymentMethods.Find(entity.PaymentMethodId);
                //var findRechargePlan = _context.RechargePlans.Find(entity.RechargePlanId);

                if (findService == null || findPaymentMethod == null)
                {
                    throw new InvalidOperationException("Service or payment method does not exist");
                }
                else
                {
                    var discount = entity.DiscountAmount != null ? entity.DiscountAmount : 0;
                    var amount = entity.TransactionAmount != null ? entity.TransactionAmount : 0;

                    Transaction newTransaction = new Transaction()
                    {
                        Phone = entity.Phone,
                        User = _context.Users.Find(entity.UserId),
                        UserId = entity.UserId,

                        Service = findService,
                        ServiceId = entity.ServiceId,

                        RechargePlan = _context.RechargePlans.Find(entity.RechargePlanId),
                        RechargePlanId = entity.RechargePlanId,

                        PaymentMethod = findPaymentMethod,
                        PaymentMethodId = entity.PaymentMethodId,

                        IsSucceeded = entity.IsSucceeded,
                        RechargePlanPrice = price,
                        TransactionAmount = amount,
                        DiscountAmount = discount

                    };
                    _context.Transactions.Add(newTransaction);
                    return Save();
                }
            }
        }

        public Transaction GetItem(int id)
        {
            if (IsExisted(id))
            {
                return _context.Set<Transaction>().FirstOrDefault(e => e.Id == id);
            }
            throw new InvalidOperationException("Transaction does not existed");
        }

        public TransactionResponse GetItemById(int id)
        {
            if (IsExisted(id))
            {
                var res = Convert(_context.Transactions.Find(id));
                return res;
            }
            throw new InvalidOperationException("Transaction does not existed");
        }

        public ICollection<TransactionResponse> GetListItems()
        {
            var getList = _context.Set<Transaction>()
                                  .Where(p => !p.IsDeleted)
                                  .OrderBy(p => p.Id)
                                  .ToList();

            return getList.Select(Convert).ToList();
        }


        public bool IsExisted(int id)
        {
            return _context.Transactions.Any(e => e.Id == id && e.IsDeleted == false);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool Update(int id, Transaction entity)
        {

            var existedE = GetItem(id);
            if (existedE == null)
            {
                throw new InvalidOperationException("Transaction not found");
            }

            var findService = _context.Services.Find(entity.ServiceId);
            var findUSer = _context.Users.Find(entity.UserId);
            var findPaymentMethod = _context.PaymentMethods.Find(entity.PaymentMethodId);
            var findRechargePlan = entity.RechargePlanId != null ? _context.RechargePlans.Find(entity.RechargePlanId) : null;
            var findPrice = findRechargePlan?.Price ?? 0;

            existedE.UserId = entity.UserId;
            existedE.ServiceId = entity.ServiceId;
            existedE.PaymentMethodId = entity.PaymentMethodId;
            existedE.RechargePlanId = entity.RechargePlanId;
            existedE.User = findUSer;
            existedE.Service = findService;
            existedE.RechargePlan = findRechargePlan;
            existedE.PaymentMethod = findPaymentMethod;
            existedE.Phone = entity.Phone;
            existedE.IsSucceeded = entity.IsSucceeded;
            existedE.TransactionAmount = findPrice;
            existedE.ModifiedAt = DateTime.Now;

            _context.Transactions.Update(existedE);
            return Save();
        }


        public int AmountOfTheDay()
        {
            int totalAmount = ((int)_context.Transactions
           .Where(t => t.CreatedAt.Date == DateTime.Today)
           .Sum(t => t.TransactionAmount));

            //string formattedtotalAmount = totalAmount.ToString("N0") + " VND";

            return totalAmount;
        }

        // đấm số user thực hiện giao dịch
        public int CountUniqueTransactionUsersOfTheDay()
        {
            int uniqueUserCount = _context.Transactions.Where(t => t.CreatedAt.Date == DateTime.Today).Select(t => t.UserId).Distinct().Count();
            return uniqueUserCount;
        }

        // cái này làm thêm, lấy đầy đủ danh sách giao dịch
        public int CountTransactionsOfTheDay()
        {
            int transactionCount = _context.Transactions.Count(t => t.CreatedAt.Date == DateTime.Today);
            return transactionCount;
        }

        // cái này tính tổng tiên giao dịch
        public int TotalAmount()
        {
            int totalAmount = ((int)_context.Transactions.Where(t => t.IsSucceeded == true).Sum(t => t.TransactionAmount));
            return totalAmount;
        }

        // lấy danh sách thanh tóan của một User theo userId
        public List<TransactionResponse> GetTransactionByUserId(int userId)
        {
            var transactionList = _context.Transactions.Where(t => t.UserId == userId).ToList();
            var transactionListResponse = new List<TransactionResponse>();
            foreach (var transaction in transactionList)
            {
                transactionListResponse.Add(Convert(transaction));
            }
            return transactionListResponse;
        }

        // hàm xóa theo yêu cầu của chị Thủy
        public bool Delete(int id, Transaction entity)
        {
            var updateDelete = _context.Transactions.Find(id);
            updateDelete.IsDeleted = entity.IsDeleted;
            _context.Transactions.Update(updateDelete);
            return Save();
        }

        // hàm bất đồng bộ
        public async Task<IEnumerable<TransactionResponse>> GetTransactionsPagedAsync(int page, int perPage)
        {
            // Sử dụng LINQ để truy vấn dữ liệu từ DbContext
            var transactions = await _context.Transactions
                .Skip((page - 1) * perPage)
                .Take(perPage)
                .ToListAsync();

            return transactions.Select(Convert).ToList();
        }

        public async Task<int> CountRecordsAsync()
        {
            var totalTransactions = _context.Transactions.Count(t => t.IsDeleted == false);
            return totalTransactions;
        }
    }
}
