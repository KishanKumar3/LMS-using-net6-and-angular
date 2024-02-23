using Microsoft.AspNetCore.Identity;
using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class DataSeeder
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public DataSeeder(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task SeedUserData()
        {
            

            if (!_userManager.Users.Any())
            {
                // Seed four users
                await SeedUser("user1@example.com", "User One", "Password123!", 1);
                await SeedUser("user2@example.com", "User Two", "Password123!", 1);
                await SeedUser("user3@example.com", "User Three", "Password123!", 1);
                await SeedUser("user4@example.com", "User Four", "Password123!", 1);
            }
        }

        private async Task SeedUser(string email, string userName, string password, int tokens)
        {
            var user = new ApplicationUser { Name = userName, Email = email , TokensAvailable = tokens };

            await _userManager.CreateAsync(user, password);

           
        }
    }

}
