using bookBorrow.Models;
using Microsoft.AspNetCore.Identity;
using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<ApplicationUser>> GetUsersAsync();
        Task<ApplicationUser> FindUserByEmailAsync(string email);

        Task UpdateTokensAsync(string email, int newTokensAvailable);

    //    Task<ApplicationUser> FindCurrentUserEmailAsync();


    }
}
