using bookBorrow.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
     public class UserRepository : IUserRepository
     {
         private readonly UserManager<ApplicationUser> _userManager;

         public UserRepository(UserManager<ApplicationUser> userManager)
         {
             _userManager = userManager;
         }

        public async Task<IEnumerable<ApplicationUser>> GetUsersAsync()
        {
            return await _userManager.Users.ToListAsync();
        }

        public async Task<ApplicationUser> FindUserByEmailAsync(string email)
        {
          
            var users = await GetUsersAsync();
            var user = users.FirstOrDefault(u => u.Email == email);

            return user;

        }

        

        public async Task UpdateTokensAsync(string email, int newTokensAvailable)
        {
            // Find the user by ID
            var user = await FindUserByEmailAsync(email);

            if (user != null)
            {
                // Update the TokensAvailable property
                user.TokensAvailable = newTokensAvailable;

                // Update the user using UserManager
                await _userManager.UpdateAsync(user);
            }
            
            
        }

      /*  public async Task<ApplicationUser> FindCurrentUserEmailAsync()
        {

            if (User.Identity.IsAuthenticated)
            {
                // Retrieve the email of the current logged-in user
                string userEmail = User.Identity.Name;

                // You can add more properties based on your ApplicationUser model
                var userInfo = new { Email = userEmail };

                return Ok(userInfo);
            }
            else
            {
                return Unauthorized("User not authenticated");
            }

        } */


        /*public List<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public User GetById(int id)
        {
            return _context.Users.Find(id);
        }

        public void Add(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void Update(int id, User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }*/
    }

}
