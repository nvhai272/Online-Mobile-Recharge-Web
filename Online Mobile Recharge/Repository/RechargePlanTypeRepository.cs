using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
    public class RechargePlanTypeRepository : ICrud<RechargePlanType, RechargePlanTypeResponse>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public RechargePlanTypeRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public bool Create([FromBody] RechargePlanType entity)
        {
            if (string.IsNullOrWhiteSpace(entity.Name))
            {
                throw new ArgumentException("Name is required");
            }

            if (_context.RechargePlanTypes.Any(p => p.Name == entity.Name))
            {
                throw new InvalidOperationException("A recharge plan type with the same name already exists");
            }

            RechargePlanType newRechargePlanType = new RechargePlanType()
            {
                Name = entity.Name,
                Description = entity.Description,
                RechargePlans = entity.RechargePlans
            };

            _context.RechargePlanTypes.Add(newRechargePlanType);
            return Save();
        }

        public RechargePlanTypeResponse GetItemById(int id)
        {
            if (IsExisted(id))
            {
                return _mapper.Map<RechargePlanTypeResponse>(_context.Set<RechargePlanType>().FirstOrDefault(e => e.Id == id));
            }
            throw new InvalidOperationException("RechargePlanType does not existed");
        }

        public RechargePlanType GetItem(int id)
        {
            if (IsExisted(id))
            {
                return _context.Set<RechargePlanType>().FirstOrDefault(e => e.Id == id);
            }
            throw new InvalidOperationException("RechargePlanType does not existed");
        }

        public ICollection<RechargePlanTypeResponse> GetListItems()
        {
            return _mapper.Map<List<RechargePlanTypeResponse>>(_context.Set<RechargePlanType>().Where(p => p.IsDeleted == false).OrderBy(p => p.Id).ToList());
        }

        public bool IsExisted(int id)
        {
            return _context.RechargePlanTypes.Any(e => e.Id == id && e.IsDeleted == false);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool Update(int id, RechargePlanType entity)
        {
            var existedE = GetItem(id);
            if (existedE == null)
            {
                return false;
            }

            if (string.IsNullOrWhiteSpace(entity.Name))
            {
                throw new ArgumentException("Name is required");
            }

            if (_context.RechargePlanTypes.Any(p => p.Name == entity.Name && p.Id != id))
            {
                throw new InvalidOperationException("Another recharge plan type with the same name already exists.");
            }

            existedE.Name = entity.Name;
            existedE.Description = entity.Description;
            existedE.RechargePlans = entity.RechargePlans;
            existedE.ModifiedAt = DateTime.Now;

            _context.RechargePlanTypes.Update(existedE);
            return Save();
        }

        public bool Delete(int id, RechargePlanType entity)
        {
            var updateDelete = _context.RechargePlanTypes.Find(id);
            updateDelete.IsDeleted = entity.IsDeleted;
            _context.RechargePlanTypes.Update(updateDelete);
            return Save();
        }
    }
}
