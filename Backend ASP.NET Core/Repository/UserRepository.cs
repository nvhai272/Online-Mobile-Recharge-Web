using Microsoft.AspNetCore.Mvc;
using Online_Mobile_Recharge.DTO.Response;
using Online_Mobile_Recharge.Helper;
using Online_Mobile_Recharge.Interfaces;
using Online_Mobile_Recharge.Models;
using System.Text.RegularExpressions;

namespace Online_Mobile_Recharge.Repository
{
    public class UserRepository : IUser
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public UserResponse Convert(User e)
        {
            DateTime dateTime = e.Dob;
            string dateString = dateTime.ToString("yyyy-MM-dd");

            UserResponse res = new UserResponse()
            {
                Id = e.Id,
                Name = e.Name,
                Email = e.Email,
                Password = e.Password,
                Address = e.Address,
                Dob = dateString,
                Phone = e.Phone,
                PaymentInfo = e.PaymentInfo,
                NamePaymentMethod = e.PaymentMethod.Name,
                paymentMethodId = e.PaymentMethodId
            };
            return res;
        }

        public ICollection<UserResponse> GetListItems()
        {
            var userRes = _context.Set<User>()
                .Where(p => p.IsDeleted == false)
                .OrderBy(p => p.Id).ToList();
            var responses = new List<UserResponse>();
            foreach (var item in userRes)
            {
                responses.Add(Convert(item));
            }
            return responses;
        }

        public User GetItem(int id)
        {
            if (IsExisted(id))
            {
                return _context.Users.FirstOrDefault(e => e.Id == id);
            }
            throw new InvalidOperationException("User does not existed");
        }


        public UserResponse GetItemById(int id)
        {
            if (IsExisted(id))
            {
                var getUser = Convert(_context.Users.FirstOrDefault(e => e.Id == id));
                return getUser;
            }
            throw new InvalidOperationException("User does not existed");
        }

        public bool Create([FromBody] User entity)
        {
            throw new NotImplementedException();
        }

        public bool Update(int id, User entity)
        {
            var existedUser = GetItem(id);

            if (!IsValidUserNoPass(entity))
                return false;

            var checkPaymentMethod = _context.PaymentMethods.FirstOrDefault(p => p.Id == entity.PaymentMethodId && !p.IsDeleted);

            if (checkPaymentMethod == null)
                throw new InvalidOperationException("Invalid payment method");

            if (IsPhoneNumberExistExceptCurrent(id, entity.Phone))
                throw new InvalidOperationException("Phone number has been registered");

            existedUser.Name = entity.Name;
            existedUser.Email = entity.Email;
            existedUser.Phone = entity.Phone;
            existedUser.Address = entity.Address;
            existedUser.Dob = entity.Dob;
            existedUser.ModifiedAt = DateTime.Now;
            existedUser.PaymentMethodId = entity.PaymentMethodId;
            existedUser.PaymentMethod = entity.PaymentMethod;
            existedUser.PaymentInfo = entity.PaymentInfo;

            _context.Users.Update(existedUser);
            return Save();
        }

        private bool IsValidUserNoPass(User entity)
        {
            if (string.IsNullOrEmpty(entity.Name))
                throw new ArgumentException("Name cannot be left blank");

            if (entity.Dob == null)
                throw new ArgumentException("Dob cannot be left blank");

            if (!RegexManagement.IsValidEmail(entity.Email))
                throw new ArgumentException("Please enter a valid email. For example: abc@gmail.com");

            if (!RegexManagement.IsValidPhoneNumber(entity.Phone))
                throw new ArgumentException("Please enter a valid 10-digit phone number");

            Regex regex = new Regex(@"^\d{16}$");
            if (!regex.IsMatch(entity.PaymentInfo))
                throw new ArgumentException("Invalid Payment Info");

            return true;
        }


        public bool IsExisted(int id)
        {
            return _context.Users.Any(e => e.Id == id && e.IsDeleted == false);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool IsPhoneNumberExistExceptCurrent(int id, string phoneNumber)
        {
            return _context.Users.Any(u => u.Id != id && u.Phone == phoneNumber);
        }

        // đếm số users mới tạo tài khoản trong ngày
        public int CountNewUsersOfTheDay()
        {
            var listUser = _context.Users.Where(u => u.CreatedAt.Date == DateTime.Today).ToList();
            int countUser = listUser.Count();
            return countUser;
        }

        // đổi mật khẩu 
        public bool ChangePassword(int id, User user)
        {
            if (!RegexManagement.IsValidPassword(user.Password))
            {
                throw new ArgumentException("A valid password has at least 8 characters, including 1 number");
            }
            else
            {
                var findUserChangePassword = _context.Users.FirstOrDefault(e => e.Id == id);
                if (findUserChangePassword != null)
                {
                    findUserChangePassword.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                    _context.Users.Update(findUserChangePassword);
                    return Save();
                }
                else
                {
                    throw new InvalidOperationException("Password update failed");
                }
            }
        }

        public bool Delete(int id, User entity)
        {
            var updateDelete = GetItem(id);
            updateDelete.IsDeleted = entity.IsDeleted;
            _context.Users.Update(updateDelete);
            return Save();
        }

        public bool CreateUser([FromBody] User user)
        {

            if (!IsValidUser(user))
                return false;

            var findPaymentMethod = _context.PaymentMethods.FirstOrDefault(u => u.Id == user.PaymentMethodId && !u.IsDeleted);
            var checkPhone = _context.Users.FirstOrDefault(u => u.Phone == user.Phone && !u.IsDeleted);

            if (checkPhone != null)
            {
                throw new InvalidOperationException("Phone number has been registered");
            }
            if (findPaymentMethod == null)
            {
                throw new InvalidOperationException("Invalid payment method");
            }

            var newUser = new User
            {
                Name = user.Name,
                Email = user.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(user.Password),
                Address = user.Address,
                Dob = user.Dob,
                Phone = user.Phone,
                PaymentMethod = findPaymentMethod,
                PaymentMethodId = user.PaymentMethodId,
                PaymentInfo = user.PaymentInfo
            };

            _context.Users.Add(newUser);
            return Save();
        }

        private bool IsValidUser(User user)
        {

            if (string.IsNullOrEmpty(user.Name))
                throw new ArgumentException("Name cannot be left blank");

            if (user.Dob == null)
                throw new ArgumentException("Dob cannot be left blank");

            if (!RegexManagement.IsValidEmail(user.Email))
                throw new ArgumentException("Please enter a valid email. For example: abc@gmail.com");

            if (!RegexManagement.IsValidPhoneNumber(user.Phone))
                throw new ArgumentException("Please enter a valid 10-digit phone number");

            if (!RegexManagement.IsValidPassword(user.Password))
                throw new ArgumentException("A valid password has at least 8 characters, including 1 number");

            Regex regex = new Regex(@"^\d{16}$");
            if (!regex.IsMatch(user.PaymentInfo))
                throw new ArgumentException("Invalid Payment Info");

            return true;
        }
    }
}