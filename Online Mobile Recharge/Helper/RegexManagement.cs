using System.Text.RegularExpressions;

namespace Online_Mobile_Recharge.Helper
{
	public class RegexManagement
	{
		public static bool IsValidEmail(string email)
		{
			// Biểu thức chính quy để kiểm tra địa chỉ email
			string pattern = @"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$";

			// so sánh đầu vào có đúng với biểu thức chính quy hay khum?
			return !string.IsNullOrEmpty(email) && Regex.IsMatch(email, pattern);
		}

		public static bool IsValidPhoneNumber(string phoneNumber)
		{
			// kiểm tra số điện thoại có đúng 10 chữ số
			return !string.IsNullOrEmpty(phoneNumber) && Regex.IsMatch(phoneNumber, @"^\d{10}$");
		}
	}
}
