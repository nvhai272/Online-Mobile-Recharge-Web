using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Interfaces
{
    public interface IUserService
    {
        bool checkExisted(UserServiceRequest request);
        bool Create(UserServiceRequest request);
        bool Delete(UserServiceRequest request);
        List<ServiceOfUser> ListServicesofUser(int userId);

    }
}
