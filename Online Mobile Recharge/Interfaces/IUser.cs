using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Interfaces
{
	public interface IUser : ICrud<User, UserResponse>
	{
		int CountNewUsersOfTheDay();

		bool ChangePassword(int id, User user );

		public bool CreateUser([FromBody] User user);
    }
}
