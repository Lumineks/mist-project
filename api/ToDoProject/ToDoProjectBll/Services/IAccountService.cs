using System.Collections.Generic;
using System.Threading.Tasks;
using ToDoProjectBll.Contracts.User;

namespace ToDoProjectBll.Services
{
    public interface IAccountService
    {
        Task<IEnumerable<AccountViewDto>> GetAllAccountsAsync();

        Task<AccountDto> GetByLoginAsync(string login);

        Task<bool> AddAsync(AccountDto registeredAcc);
    }
}
