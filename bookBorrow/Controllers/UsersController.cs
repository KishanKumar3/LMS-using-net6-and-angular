using Microsoft.AspNetCore.Mvc;
using Repository.Repositories;
using Service.Services;

namespace bookBorrow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository) 
        {
            _userRepository = userRepository;
        }

        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            var books = await _userRepository.GetUsersAsync();
            return Ok(books);
        }

        [HttpGet("GetUserByEmail/{email}")]
        public async Task<IActionResult> GetByEmail([FromRoute] string email)
        {
            var user = await _userRepository.FindUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

           [HttpPut("update-tokens/{email}/{newTokens}")]
           public async Task<IActionResult> UpdateTokens(string email, int newTokens)
           {
               try
               {
                   await _userRepository.UpdateTokensAsync(email, newTokens);
                   return Ok("Tokens updated successfully");
               }
               catch (Exception ex)
               {
                   // Log the exception or handle it as needed
                   return StatusCode(500, "Internal Server Error");
               }
           }

        

    }
}
