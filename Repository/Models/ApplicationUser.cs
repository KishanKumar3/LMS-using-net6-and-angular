using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Repository.Models
{
    public class ApplicationUser : IdentityUser
    {
         public string Name { get; set; }
        public string Email { get; set; }
        public int TokensAvailable { get; set; }
    }
}
