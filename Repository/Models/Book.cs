using System.ComponentModel.DataAnnotations;

namespace bookBorrow.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }
        public string Author { get; set; }
        public string Genre { get; set; }
        public bool IsBookAvailable { get; set; }
        public string Description { get; set; }
        public string LentByUserId { get; set; }
        public string CurrentlyBorrowedByUserId { get; set; }
    }
}
