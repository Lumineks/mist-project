using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using ToDoProjectBll.Contracts;
using ToDoProjectBll.Services;

namespace ToDoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ILogger<CardController> _logger;

        private readonly ICardService _cardService;
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="cardService">Card service</param>
        /// <param name="logger">Logger</param>
        public CardController(ICardService cardService, ILogger<CardController> logger)
        {
            _cardService = cardService;
            _logger = logger;
        }

        /// <summary>
        /// Get all cards for user
        /// </summary>
        /// <returns>All cards</returns>
        [HttpGet("getAll")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ToDoCardDto>>> GetAllCards()
        {
            var userIdFromToken = ClaimsIdentityService.GetIdFromToken(User);
            var rooms = await _cardService.GetAllCardsAsync(userIdFromToken.ToString());
            if (rooms == null)
                return NotFound();

            return Ok(rooms);
        }

        /// <summary>
        /// Login action
        /// </summary>
        /// <param name="loginDto">Requested dto for login on platform</param>
        /// <returns>Returns JWT</returns>
        [HttpPost("add")]
        public async Task<ActionResult> AddCardAsync([FromBody] ToDoCardDto newCard)
        {
            if (!ModelState.IsValid || newCard == null)
            {
                return BadRequest();
            }

            try
            {
                var res = await _cardService.AddAsync(newCard, ClaimsIdentityService.GetIdFromToken(User).ToString());
                if (res)
                    return Ok();
                return BadRequest();
            }
            catch (ArgumentNullException e)
            {
                _logger.LogWarning(e.Message);
                return BadRequest();
            }
        }

        /// <summary>
        /// Delete action
        /// </summary>
        /// <param name="cardId">Requested deleting on platform</param>
        /// <returns>Status</returns>
        [HttpDelete("delete")]
        public async Task<ActionResult> DeleteCardAsync([FromBody] string cardId)
        {
            if (!ModelState.IsValid || String.IsNullOrEmpty(cardId))
            {
                return BadRequest();
            }

            try
            {
                var res = await _cardService.DeleteAsync(cardId, ClaimsIdentityService.GetIdFromToken(User).ToString());
                if (res)
                    return Ok();
                return BadRequest();
            }
            catch (ArgumentNullException e)
            {
                _logger.LogWarning(e.Message);
                return BadRequest();
            }
        }

        /// <summary>
        /// Update action
        /// </summary>
        /// <param name="cardId">Requested Updating on platform</param>
        /// <returns>Status</returns>
        [HttpPost("update")]
        public async Task<ActionResult> UpdateCardAsync([FromBody] ToDoCardDto newCard)
        {
            if (!ModelState.IsValid || newCard is null)
            {
                return BadRequest();
            }

            try
            {
                var res = await _cardService.UpdateAsync(newCard, ClaimsIdentityService.GetIdFromToken(User).ToString());
                if (res)
                    return Ok();
                return BadRequest();
            }
            catch (ArgumentNullException e)
            {
                _logger.LogWarning(e.Message);
                return BadRequest();
            }
        }
    }
}

