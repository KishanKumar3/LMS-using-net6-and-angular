using Repository.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Service.Services
{
      public class BorrowService: IBorrowService
      {
          private IBookRepository _bookRepository;
          private IUserRepository _userRepository;

          public BorrowService(IBookRepository bookRepository, IUserRepository userRepository)
          {
              _bookRepository = bookRepository;
              _userRepository = userRepository;
          }
          public async Task BorrowBookAsync(string email, int bookId)
          {
              // Get book and user entities
              var book = await _bookRepository.GetByIdAsync(bookId);
              var user = await _userRepository.FindUserByEmailAsync(email);

              


            if (!book.IsBookAvailable)
                throw new ValidationException("Book is already borrowed");

           if (user.TokensAvailable <= 0)
                throw new ValidationException("You have no tokens left");

            if (book.LentByUserId == user.Email)
                throw new ValidationException("You cannot borrow your own book");
              // Update book status
            book.IsBookAvailable = false;
            book.CurrentlyBorrowedByUserId = email;

              // Update user tokens
            user.TokensAvailable--;

              // Add book to user's borrowed list
              //user.BooksBorrowed.Add(bookId);

              // Add user to book's borrowed by list
              //book.CurrentlyBorrowedByUserId.Add(userId);



              // Give token to lender 
            var lenderEmail = book.LentByUserId;
            var lender = await _userRepository.FindUserByEmailAsync(lenderEmail);
            lender.TokensAvailable++;

              // Save changes
            await _bookRepository.UpdateBookAsync(bookId,book);
            await _userRepository.UpdateTokensAsync(lenderEmail,lender.TokensAvailable);
            await _userRepository.UpdateTokensAsync(email, user.TokensAvailable);
        }
      } 
}
