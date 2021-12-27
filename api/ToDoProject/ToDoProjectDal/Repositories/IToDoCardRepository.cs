using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoProjectDal.Entities;

namespace ToDoProjectDal.Repositories
{
    public interface IToDoCardRepository : IRepository<ToDoCard>
    {
    }
}
