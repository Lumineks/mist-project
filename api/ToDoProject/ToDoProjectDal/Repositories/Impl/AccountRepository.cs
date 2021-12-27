using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ToDoProjectDal.Context;
using ToDoProjectDal.Entities;

namespace ToDoProjectDal.Repositories.Impl
{
    public class AccountRepository : Repository<Account>, IAccountRepository
    {
        public AccountRepository(DatabaseContext context) : base(context)
        {
        }

        public async Task<Account> GetAccountByLoginAsync(string login)
        {
            return await Set.FirstOrDefaultAsync(x => x.Login == login);
        }
    }
}
