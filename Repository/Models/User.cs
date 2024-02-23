using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace bookBorrow.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int TokensAvailable { get; set; }
        [NotMapped]
        public List<string> BooksBorrowed { get; set; }
        [NotMapped]
        public List<string> BooksLent { get; set; }
    }
}
