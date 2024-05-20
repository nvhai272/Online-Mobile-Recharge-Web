using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Repository
{
    public class UserServiceRepository : IUserService
    {
        private readonly DataContext _dataContext;

        public UserServiceRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public bool Save()
        {
            var save = _dataContext.SaveChanges();
            return save > 0 ? true : false;
        }

        public bool checkExisted(UserServiceRequest request)
        {
            var checkUserService = _dataContext.User_Service.FirstOrDefault(us => us.UserId == request.UserId && us.ServiceId == request.ServiceId);

            if (checkUserService != null)
            {
                return true;
            }
            return false;
        }

        public bool Create(UserServiceRequest request)
        {
            if (!checkExisted(request))
            {
              var hehe =  new UserService()
                {
                    UserId = request.UserId,
                    ServiceId = request.ServiceId
                };
                _dataContext.User_Service.Add(hehe);
                return Save();
            }

            return false;
        }

        public bool Delete(UserServiceRequest request)
        {
            var checkUserService = _dataContext.User_Service.FirstOrDefault(us => us.UserId == request.UserId && us.ServiceId == request.ServiceId);
            if (checkUserService != null)
            {
                _dataContext.User_Service.Remove(checkUserService);
                return Save();
            }
            return false;
        }

        public ServiceOfUser Convert(UserService request)
        {
            return new ServiceOfUser()
            {
                //UserName = _dataContext.Users.FirstOrDefault(u => u.Id == request.UserId).Name,
                ServiceName = _dataContext.Services.FirstOrDefault(s => s.Id == request.ServiceId).Name
            };
        }

        public List<ServiceOfUser> ListServicesofUser(int userId)
        {
            var listService = _dataContext.User_Service.Where(us => us.UserId == userId).ToList();
            var list = new List<ServiceOfUser>();
            foreach (var userService in listService)
            {
                list.Add(Convert(userService));
            }
            return list;
        }
    }
}
