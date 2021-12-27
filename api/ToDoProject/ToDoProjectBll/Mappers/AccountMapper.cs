using ToDoProjectBll.Contracts.User;
using ToDoProjectDal.Entities;

namespace ToDoProjectBll.Mappers
{
    public static class AccountMapper
    {
        public static Account Map(AccountDto obj)
        {
            return obj == null
                ? null
                : new Account
                {
                    Id = obj.Id,
                    Login = obj.Login,
                    PasswordHash = obj.PasswordHash
                };
        }

        public static AccountDto Map(Account obj)
        {
            return obj == null
                ? null
                : new AccountDto
                {
                    Id = obj.Id,
                    Login = obj.Login,
                    PasswordHash = obj.PasswordHash
                };
        }
        public static AccountViewDto MapForView(Account obj)
        {
            return obj == null
                ? null
                : new AccountViewDto
                {
                    Id = obj.Id,
                    Login = obj.Login
                };
        }
    }
}
