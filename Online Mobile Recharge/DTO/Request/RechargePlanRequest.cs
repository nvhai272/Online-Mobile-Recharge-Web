﻿using Online_Mobile_Recharge.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Online_Mobile_Recharge.DTO.Request
{
	public class RechargePlanRequest
	{


		public RechargePlanType RechargePlanType { get; set; }

		public Operator? Operator { get; set; }

		public string Name { get; set; }

		public int TalkTime { get; set; }

		public int? TextMessageNumber { get; set; }

		public int? DataNumberTotal { get; set; }

		public int? DataNumberPerDay { get; set; }

		public int Validity { get; set; }

		public decimal Price { get; set; }

		public string? Description { get; set; }

		//public ICollection<Transaction> Transactions { get; set; }


	}
}
