using bookBorrow.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Service.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repository.Repositories;

namespace bookBorrow.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;

        public BooksController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet("GetBooks")]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _bookRepository.GetBooksAsync();
            return Ok(books);
        }

        [HttpGet("GetBooksById/{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var book = await _bookRepository.GetByIdAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost("AddBook")]
        //[Authorize]
        public async Task<IActionResult> AddBook([FromBody] Book book)
        {
            var id = await _bookRepository.AddBookAsync(book);
            return CreatedAtAction(nameof(GetById), new { id = id, controller = "books" }, id);
        }

        [HttpPut("UpdateBook{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book book)
        {
            
            await _bookRepository.UpdateBookAsync(id, book);

            return Ok();
        }

    }
}
