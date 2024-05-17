using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
    public class PaymentMethodRepository : ICrud<PaymentMethod, PaymentMethodResponse>
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
            if (string.IsNullOrWhiteSpace(newMethod.Name))
            {
                throw new ArgumentException("Please enter a name for the payment method");
            }

            var existingMethod = _context.PaymentMethods.FirstOrDefault(p => p.Name == newMethod.Name && !p.IsDeleted);

            if (existingMethod != null)
            {
                throw new InvalidOperationException("A payment method with the same name already exists");
            }

            PaymentMethod method = new PaymentMethod();
            method.Name = newMethod.Name;
            method.Description = newMethod.Description;
            _context.PaymentMethods.Add(method);

            return Save();

        }

        public bool Delete(int id, PaymentMethod entity)
        {
            var updateDelete = _context.PaymentMethods.Find(id);
            updateDelete.IsDeleted = entity.IsDeleted;
            _context.PaymentMethods.Update(updateDelete);
            return Save();
        }

        public PaymentMethod GetItem(int id)
        {
            if (IsExisted(id))
            {
                return _context.Set<PaymentMethod>().FirstOrDefault(e => e.Id == id);
            }
            throw new InvalidOperationException("PaymentMethod does not existed");
        }

        public PaymentMethodResponse GetItemById(int id)
        {
            if (IsExisted(id))
            {
                return _mapper.Map<PaymentMethodResponse>(_context.Set<PaymentMethod>().FirstOrDefault(e => e.Id == id));
            }
            throw new InvalidOperationException("PaymentMethod does not existed");
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
            var updateE = GetItem(id);
            if (updateE == null)
            {
                return false;
            }

            if (string.IsNullOrWhiteSpace(entity.Name))
            {
                throw new ArgumentException("Please enter a name for the payment method");
            }

            if (_context.PaymentMethods.Any(p => p.Id != id && p.Name == entity.Name && !p.IsDeleted))
            {
                throw new InvalidOperationException("A payment method with the same name already exists");
            }

            updateE.Name = entity.Name;
            updateE.Description = entity.Description;
            updateE.ModifiedAt = DateTime.UtcNow;
            _context.PaymentMethods.Update(updateE);
            return Save();
        }
    }
}