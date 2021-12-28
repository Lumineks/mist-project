using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoProjectBll.Contracts;
using ToDoProjectBll.Contracts.User;
using ToDoProjectBll.Mappers;
using ToDoProjectDal.Repositories;

namespace ToDoProjectBll.Services.Impl
{
    public class CardService : ICardService
    {
        private readonly IToDoCardRepository _cardRepository;

        public CardService(IToDoCardRepository cardRepository)
        {
            _cardRepository = cardRepository;
        }

        public async Task<IEnumerable<ToDoCardDto>> GetAllCardsAsync(string userId)
        {
            var cards = await _cardRepository.GetAllAsync();
            if (cards is null)
                return null;

            return cards.Where(x => x.Account_Id.Equals(Guid.Parse(userId))).Select(CardMapper.Map).ToList();
        }
        
        public async Task<bool> UpdateAsync(ToDoCardDto updatedCard, string userId)
        {
            if (updatedCard == null || String.IsNullOrEmpty(userId))
                throw new ArgumentNullException(nameof(updatedCard));

            var card = await _cardRepository.GetByIdAsync(updatedCard.Id);
            if (card is null || card.Account_Id.ToString() != userId)
                return false;

            var updatedCardInDb = CardMapper.Map(updatedCard);
            updatedCardInDb.Id = updatedCard.Id;
            updatedCardInDb.Account_Id = Guid.Parse(userId);
            await _cardRepository.RemoveByIdAsync(updatedCardInDb.Id);
            await _cardRepository.AddAsync(updatedCardInDb);
            return true;
        }

        public async Task<bool> AddAsync(ToDoCardDto newCard, string userId)
        {
            if (newCard == null || String.IsNullOrEmpty(userId))
                throw new ArgumentNullException(nameof(newCard));

            var newCardInDb = CardMapper.Map(newCard);
            newCardInDb.Id = Guid.NewGuid();
            newCardInDb.Account_Id = Guid.Parse(userId);
            newCardInDb.Timestamp = DateTime.UtcNow;

            await _cardRepository.AddAsync(newCardInDb);
            return true;
        }
        
        public async Task<bool> DeleteAsync(string cardId, string userId)
        {
            if (String.IsNullOrEmpty(cardId) || String.IsNullOrEmpty(userId))
                throw new ArgumentNullException();

            var card = await _cardRepository.GetByIdAsync(Guid.Parse(cardId));
            if (card is null || card.Account_Id.ToString() != userId)
                return false;

            await _cardRepository.RemoveByIdAsync(Guid.Parse(cardId));
            return true;
        }
    }
}
