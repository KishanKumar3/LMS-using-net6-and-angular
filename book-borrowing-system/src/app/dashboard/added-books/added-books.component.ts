import { Component, OnInit} from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

import { BookDetailsModalComponent } from '../book-details-modal/book-details-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-added-books',
  templateUrl: './added-books.component.html',
  styleUrls: ['./added-books.component.css']
})
export class AddedBooksComponent implements OnInit {

  loggedinUser : string="";
  books: any[] = [];


  searchTerm: string = '';
  filteredBooks: any[] = [];
  selectedFilter: string = 'all';


  constructor( private bookService: BooksService, private userService: UserService,private authService: AuthService,public dialog: MatDialog) { 
  }

  ngOnInit() {
    this.loadBooks();
    
    this.userService.getEmail().subscribe(val => {
      let emailFromToken = this.authService.getEmailFromToken();
      this.loggedinUser = val || emailFromToken 
       

    })

  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe(
      (data: any[]) => {
        // Filter books based on the current user's email
        this.books = data.filter(book => book.lentByUserId === this.loggedinUser);
        this.filteredBooks = [...this.books];
        
      },
      (error) => {
        console.error('Error loading books:', error);
      }
    );
  }
  
  applyFilter() {
    if (this.selectedFilter === 'available') {
      this.filteredBooks = this.books.filter(book => book.isBookAvailable);
    } else {
      this.filteredBooks = this.books;
    }
  }

  onFilterChange() {
    this.applyFilter();
  }

  searchBooks() {
    if (this.searchTerm.trim() === '') {
      this.applyFilter();
    } else {
      this.filteredBooks = this.filteredBooks.filter(
        (book) =>
          book.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(this.searchTerm.toLowerCase()) 
      );
    }
  }

    // const token = localStorage.getItem('token');
    // this.loggedinUser = token !== null ? token : '';
    // console.log('Logged In User ID:', this.loggedinUser);

    // this.bookService.getAllBooks().subscribe(
    //   data=>{
    //     this.books = data;

    //     const storedBooks = localStorage.getItem('Books');

    //     if (storedBooks !== null) {
    //       const newBook = JSON.parse(storedBooks);
  
    //       if (Array.isArray(newBook)) {
    //         this.books = [...newBook, ...this.books];
    //       } else {
    //         this.books = [newBook, ...this.books];
    //       }
    //     }
  
    //     console.log(this.books);
    //     this.books = this.books.filter((book: { Lent_By_User_Id: string | null; }) => book.Lent_By_User_Id === token);
    //     console.log(this.books);
    //   }
    // );
  
  

  openBookDetailsModal(book: any): void {
    const dialogRef = this.dialog.open(BookDetailsModalComponent, {
      width: '400px', // Set the desired width
      data: { book } // Pass data to the modal
    });
  }
}