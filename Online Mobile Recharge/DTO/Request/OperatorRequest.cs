using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Request
{
	public class OperatorRequest
	{
		public string Name { get; set; }
		public string? Description { get; set; }
		public bool IsDeleted { get; set; }

		//public ICollection<RechargePlan> RechargePlans { get; set; }
	}

	public class OperatorRequestDel
	{
		public bool IsDeleted { get; set; }
	}
}
