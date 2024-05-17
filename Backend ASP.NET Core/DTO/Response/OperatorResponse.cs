using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Response
{
	public class OperatorResponse
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string? Description { get; set; }

	}
}
