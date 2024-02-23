using bookBorrow.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public interface IBookRepository
    {
        Task<List<Book>> GetBooksAsync();
        Task<Book> GetByIdAsync(int id);
        Task<int> AddBookAsync(Book book);
        Task UpdateBookAsync(int id , Book book);

    }

}
