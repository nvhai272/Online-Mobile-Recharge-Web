namespace Online_Mobile_Recharge.Exceptions
{

	// Tự tạo Exception nhưng có vẻ không cần thiết cho lắm? Có thể xóa được 
	public class CustomStatusException : Exception
	{
		public int StatusCode { get; }
		public string Status { get; }
		public override string Message { get; }

		public CustomStatusException(int statusCode, string status, string message) : base(message)
		{
			StatusCode = statusCode;
			Status = status;
			Message = message;
		}

		public CustomStatusException(string message, Exception inner) : base(message, inner)
		{
			//Message = message;
		}
		public CustomStatusException(string message) : base(message)
		{
			//Message = message;
		}
	}
}
