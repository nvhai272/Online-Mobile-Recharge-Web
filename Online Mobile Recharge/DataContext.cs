using Microsoft.EntityFrameworkCore;
using Online_Mobile_Recharge.Models;

namespace Online_Mobile_Recharge
{
	public class DataContext: DbContext
	{
		public DataContext(DbContextOptions<DataContext> options):base(options) { }

		public DbSet<User> Users { get; set; }
		public DbSet<Transaction> Transactions { get; set; }
		public DbSet<UserService> User_Service { get; set; }
		public DbSet<Feedback> Feedbacks { get; set; }
		public DbSet<Operator> Operators { get; set; }
		public DbSet<RechargePlan> RechargePlans { get; set; }
		public DbSet<Service> Services { get; set; }
		public DbSet<PaymentMethod> PaymentMethods { get; set; }
		public DbSet<RechargePlanType> RechargePlanTypes { get; set; }

	}
}
