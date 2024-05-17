namespace Online_Mobile_Recharge.Exceptions
{
	public class InvalidInputException : Exception
	{
		public int StatusCode { get; }
		public string Status { get; }
		public override string Message { get; }

		public InvalidInputException(int statusCode, string status, string message) : base(message)
		{
			StatusCode = statusCode;
			Status = status;
			Message = message;
		}

		public InvalidInputException(string message, Exception inner) : base(message, inner)
		{
			//Message = message;
		}
		public InvalidInputException(string message) : base(message)
		{
			//Message = message;
		}
	}
}
