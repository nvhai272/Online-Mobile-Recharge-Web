using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.DTO.Request
{
	public class RechargePlanTypeRequest
	{
		public string Name { get; set; }
		public string? Description { get; set; }
		public bool IsDeleted { get; set; }

		//public ICollection<RechargePlan> RechargePlans { get; set; }
	}
}
