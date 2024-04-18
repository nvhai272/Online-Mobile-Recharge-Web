using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Response
{
    public class OperatorResponse
    {
		[Required]
		[MaxLength(100)]
		public string Name { get; set; }

		public bool IsDeleted { get; set; } 

		public DateTime CreatedAt { get; set; } 

		public DateTime ModifiedAt { get; set; } 

		public ICollection<RechargePlan> RechargePlans { get; set; }
	}
}
