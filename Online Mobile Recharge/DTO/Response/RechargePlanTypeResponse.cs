using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge.DTO.Response
{
    public class RechargePlanTypeResponse
    {
		[Required]
		[MaxLength(100)]
		public string Name { get; set; }

		[MaxLength(255)]
		public string? Description { get; set; }

		public DateTime CreatedAt { get; set; } 

		public DateTime ModifiedAt { get; set; } 

		public bool IsDeleted { get; set; }  

		// Mot kieu lại nap tien co nhieu goi nap tien
		public ICollection<RechargePlan> RechargePlans { get; set; }
	}
}
