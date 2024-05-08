using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Request
{
    public class UserLoginDto
    {
        public required string PhoneNumber { get; set; }
        public required string Password { get; set; }
    }

    public class UserRequest
    {
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(50)]
        public string Password { get; set; }

        public string Phone { get; set; }

        [MaxLength(100)]
        public string Email { get; set; }

        public DateTime Dob { get; set; }

        [MaxLength(150)]
        public string Address { get; set; }

        public string? PaymentInfo { get; set; }

        public int? PaymentMethodId { get; set; }

    }
    public class UserRequestDel
    {
        public bool IsDeleted { get; set; }
    }

    public class UserRequestChangePassword
    {
        public string Password { get; set; }
    }

    public class UserRequestEdit
    {
        [MaxLength(100)]
        public string Name { get; set; }

        public string Phone { get; set; }

        [MaxLength(100)]
        public string Email { get; set; }

        public DateTime Dob { get; set; }

        [MaxLength(150)]
        public string Address { get; set; }
        public string? PaymentInfo { get; set; }

        public int? PaymentMethodId { get; set; }
    }

}
