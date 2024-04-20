using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Response
{
	public class UserPaymentInfoResponse
	{
		public int Id { get; set; }
		public int CardNumber { get; set; }

		public PaymentMethod PaymentMethod { get; set; }

		public User User { get; set; }
	}
}
