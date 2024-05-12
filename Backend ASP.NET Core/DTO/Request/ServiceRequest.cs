using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Request
{
    public class ServiceRequest
    {
        public string Name { get; set; }

        public string? Description { get; set; }
    }

    public class ServiceRequestDel
    {
        public bool IsDeleted { get; set; }
    }
}
