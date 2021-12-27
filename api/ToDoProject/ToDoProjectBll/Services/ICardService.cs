using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoProjectBll.Contracts;

namespace ToDoProjectBll.Services
{
    public interface ICardService
    {
        Task<IEnumerable<ToDoCardDto>> GetAllCardsAsync(string userId);

        Task<bool> AddAsync(ToDoCardDto updatedCard, string userId);

        Task<bool> DeleteAsync(string cardId, string userId);

        Task<bool> UpdateAsync(ToDoCardDto updatedCard, string userId);

    }
}
