using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.Interfaces
{
	public interface IUser : ICrud<User, UserResponse>
	{
		int CountNewUsersOfTheDay();

		bool ChangePassword(int userId, string newPassword);
	}
}
