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
// cấu hình DbContext của mình để sử dụng các proxy tải lười biếng và SQL Server làm nhà cung cấp cơ sở dữ liệu cơ bản

// đăng kí các dịch vụ dependency injection (DI) container
builder.Services.AddScoped<IUser, UserRepository>();

builder.Services.AddScoped<ICrud<PaymentMethod, PaymentMethodResponse>, PaymentMethodRepository>();

builder.Services.AddScoped<ITransaction, TransactionRepository>();

builder.Services.AddScoped<ICrud<Operator, OperatorResponse>, OperatorRepository>();

builder.Services.AddScoped<ICrud<RechargePlan, RechargePlanResponse>, RechargePlanRepository>();

builder.Services.AddScoped<ICrud<RechargePlanType, RechargePlanTypeResponse>, RechargePlanTypeRepository>();

builder.Services.AddScoped<ICrud<Feedback, FeedbackResponse>, FeedbackRepository>();

builder.Services.AddScoped<ICrud<Service, ServiceResponse>, ServiceRepository>();

builder.Services.AddScoped<ICrud<UserService, UserServiceResponse>, UserServiceRepository>();

builder.Services.AddScoped<IAuthentication, AuthenticationRepository>();

// tích hợp AutoMapper vào ứng dụng của bạn, cho phép bạn sử dụng các tính năng của nó như ánh xạ tự động, tùy chỉnh ánh xạ và nhiều hơn nữa
builder.Services.AddAutoMapper(typeof(Program));

// cấu hình CORS (Cross-Origin Resource Sharing)
// CORS là một cơ chế trong trình duyệt web cho phép một trang web ở một nguồn gốc (origin)
// cụ thể yêu cầu tài nguyên từ một nguồn khác mà không bị chặn bởi Same-Origin Policy
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
