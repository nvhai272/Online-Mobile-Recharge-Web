using Microsoft.EntityFrameworkCore;
using Online_Mobile_Recharge;
using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;
using Online_Mobile_Recharge.Repository;


var builder = WebApplication.CreateBuilder(args);


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(op => op.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("ConStr")));

builder.Services.AddScoped<IUser, UserRepository>();

builder.Services.AddScoped<ICrud<UserPaymentInfo,UserPaymentInfoResponse>, UserPaymentInfoReposity>();

builder.Services.AddScoped<ICrud<PaymentMethod,PaymentMethodResponse>, PaymentMethodRepository>();

builder.Services.AddScoped<ITransaction, TransactionRepository>();

builder.Services.AddScoped<ICrud<Operator,OperatorResponse>, OperatorRepository>();

builder.Services.AddScoped<ICrud<RechargePlan,RechargePlanResponse>, RechargePlanRepository>();

builder.Services.AddScoped<ICrud<RechargePlanType,RechargePlanTypeResponse>, RechargePlanTypeRepository>();

builder.Services.AddScoped<ICrud<Feedback,FeedbackResponse>, FeedbackRepository>();

builder.Services.AddScoped<ICrud<Service,ServiceResponse>, ServiceRepository>();

builder.Services.AddScoped<ICrud<UserService,UserServiceResponse>, UserServiceRepository>();


//builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: "AllowAll",
					  builder =>
					  {
						  builder.AllowAnyOrigin()
								 .AllowAnyMethod()
								 .AllowAnyHeader();
					  });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
