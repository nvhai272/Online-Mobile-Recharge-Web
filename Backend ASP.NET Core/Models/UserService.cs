﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.Models
{
	[Table("user_service")]
	public class UserService
	{
		[Key]
		public int Id { get; set; }

		//khoa ngoai
		public int UserId { get; set; }
		public virtual User User { get; set; }

		//khoa ngoai
		public int ServiceId { get; set; }
		public virtual Service Service { get; set; }

		public DateTime CreatedAt { get; set; } = DateTime.Now;

		public DateTime ModifiedAt { get; set; } = DateTime.Now;

	}
}
