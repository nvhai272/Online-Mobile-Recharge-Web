using System.Security.Cryptography;
using System.Text;

namespace Online_Mobile_Recharge.Helper
{
	public class PasswordManager
	{
		// Sử lí mã hóa mật khâủ ở đây nha

		public string HashPassword(string password)
		{
			using (SHA256 sha256Hash = SHA256.Create())
			{
				byte[] hashBytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));
				StringBuilder builder = new StringBuilder();
				for (int i = 0; i < hashBytes.Length; i++)
				{
					builder.Append(hashBytes[i].ToString("x2"));
				}
				return builder.ToString();
			}
		}
	}
}
