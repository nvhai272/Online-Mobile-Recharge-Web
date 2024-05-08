using AutoMapper;
using Online_Mobile_Recharge.DTO.Request;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Models;
namespace Online_Mobile_Recharge.MappingProfiles
{
    public class MappingProfiles : Profile
    {
        // Sử dụng dịch vụ Mapping đã đăng kí từ lớp Program, hỗ trợ chuyển đổi và ánh xạ giữa các model
        public MappingProfiles()
        {
            CreateMap<User, UserRequest>().ReverseMap();
            CreateMap<User, UserRequestEdit>().ReverseMap();

            CreateMap<PaymentMethod, PaymentMethodRequest>().ReverseMap();
            CreateMap<Transaction, TransactionRequest>().ReverseMap();

            CreateMap<Feedback, FeedbackRequest>().ReverseMap();
            CreateMap<Operator, OperatorRequest>().ReverseMap();
            CreateMap<Service, ServiceRequest>().ReverseMap();
            CreateMap<RechargePlan, RechargePlanRequest>().ReverseMap();
            CreateMap<RechargePlanType, RechargePlanTypeRequest>().ReverseMap();
            CreateMap<UserService, UserServiceRequest>().ReverseMap();

            CreateMap<User, UserResponse>().ReverseMap();
            CreateMap<PaymentMethod, PaymentMethodResponse>().ReverseMap();
            CreateMap<Service, ServiceResponse>().ReverseMap();
            CreateMap<Feedback, FeedbackResponse>().ReverseMap();
            CreateMap<Operator, OperatorResponse>().ReverseMap();
            CreateMap<Transaction, TransactionResponse>().ReverseMap();
            CreateMap<RechargePlan, RechargePlanResponse>().ReverseMap();
            CreateMap<RechargePlanType, RechargePlanTypeResponse>().ReverseMap();
            CreateMap<UserService, UserServiceResponse>().ReverseMap();

            CreateMap<User, UserRequestDel>().ReverseMap();
            CreateMap<User, UserRequestChangePassword>().ReverseMap();

            CreateMap<PaymentMethod, PaymentMethodRequestDel>().ReverseMap();
            CreateMap<Transaction, TransactionRequestDel>().ReverseMap();
            CreateMap<Feedback, FeedbackRequestDel>().ReverseMap();
            CreateMap<Operator, OperatorRequestDel>().ReverseMap();
            CreateMap<Service, ServiceRequestDel>().ReverseMap();
            CreateMap<RechargePlan, RechargePlanRequestDel>().ReverseMap();
            CreateMap<RechargePlanType, RechargePlanTypeRequestDel>().ReverseMap();
            CreateMap<UserService, UserServiceRequestDel>().ReverseMap();

        }
    }
}
