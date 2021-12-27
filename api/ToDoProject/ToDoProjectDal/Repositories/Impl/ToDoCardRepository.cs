using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoProjectDal.Context;
using ToDoProjectDal.Entities;

namespace ToDoProjectDal.Repositories.Impl
{
    public class ToDoCardRepository : Repository<ToDoCard>, IToDoCardRepository
    {
        public ToDoCardRepository(DatabaseContext context) : base(context)
        {
        }
    }
}
