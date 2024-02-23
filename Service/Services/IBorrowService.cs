using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    //Business logic for app
    public interface IBorrowService
    {
        Task BorrowBookAsync(string email, int bookId);
    }
}
