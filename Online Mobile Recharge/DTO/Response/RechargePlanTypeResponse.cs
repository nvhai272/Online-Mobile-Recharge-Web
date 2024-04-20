using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.DTO.Response
{
    public class RechargePlanTypeResponse
    {
		
		public string Name { get; set; }

		public string? Description { get; set; }

		public ICollection<RechargePlan> RechargePlans { get; set; }
	}
}
