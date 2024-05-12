using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Interfaces
{
    public interface IAuthentication
    {
        LoginResponse Login(UserLoginDto request);
        string CreateToken(User user);
       

    }
}
