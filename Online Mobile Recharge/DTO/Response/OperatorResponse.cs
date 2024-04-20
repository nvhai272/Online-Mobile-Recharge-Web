using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Response
{
    public class OperatorResponse
    {
		public string Name { get; set; }

		public ICollection<RechargePlan> RechargePlans { get; set; }
	}
}
