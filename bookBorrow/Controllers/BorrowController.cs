using bookBorrow.Models;
using Microsoft.AspNetCore.Mvc;
using Repository.Models;
using Repository.Repositories;
using Service.Services;
using System.ComponentModel.DataAnnotations;

namespace bookBorrow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowController : ControllerBase
      {
        private readonly IBorrowService _borrowService;

        public BorrowController(IBorrowService borrowService)
        {
            _borrowService = borrowService;
        }
        [HttpPost("borrow")]
        public async Task<IActionResult> BorrowBook([FromBody] BorrowRequestModel requestModel)
        {
            try
            {
                await _borrowService.BorrowBookAsync(requestModel.Email, requestModel.BookId);
                return Ok("Book borrowed successfully");
            }
            catch (ValidationException ex)
            {
                // Handle ValidationException
                return BadRequest(new { error = ex.Message });
            }
            
        }
    } 
}
