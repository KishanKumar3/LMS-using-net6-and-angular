using AutoMapper;
using bookBorrow.Models;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using static System.Reflection.Metadata.BlobBuilder;

namespace Repository.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly Dbcontext _context;
        private readonly IMapper _mapper;

        public BookRepository(Dbcontext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<Book>> GetBooksAsync()
        {
               var records = await _context.Books.ToListAsync();
               return _mapper.Map<List<Book>>(records);
       /*     var records = await _context.Books.Select(x => new Book()
            {
                Id = x.Id,
                Name = x.Name,
                Rating = x.Rating,
                Author = x.Author,
                Genre = x.Genre,
                IsBookAvailable = x.IsBookAvailable,
                Description = x.Description,
                LentByUserId = x.LentByUserId,
                CurrentlyBorrowedByUserId = x.CurrentlyBorrowedByUserId,
            } ).ToListAsync();
            return records; */
        }

        public async Task<Book> GetByIdAsync(int id)
        {
            var book = await _context.Books.FindAsync(id);
            return _mapper.Map<Book>(book);
        }

        public async Task<int> AddBookAsync(Book book) {
            {
                var _book = new Book()
                {
                    Name = book.Name,
                    Rating = book.Rating,
                    Author = book.Author,
                    Genre = book.Genre,
                    IsBookAvailable = book.IsBookAvailable,
                    Description = book.Description,
                    LentByUserId = book.LentByUserId,
                    CurrentlyBorrowedByUserId = book.CurrentlyBorrowedByUserId

                };

                _context.Books.Add(_book);
                await _context.SaveChangesAsync();

                return _book.Id;
            }

            
        }

        public async Task UpdateBookAsync(int id, Book book)
        {
            var existingBook = await _context.Books.FindAsync(id);

            if (existingBook !=null)
            {
                // Update the properties of the existing book
                existingBook.IsBookAvailable = book.IsBookAvailable;
                existingBook.LentByUserId = book.LentByUserId;
                existingBook.CurrentlyBorrowedByUserId = book.CurrentlyBorrowedByUserId;

                await _context.SaveChangesAsync();
            }
            
           
        }

        }
}