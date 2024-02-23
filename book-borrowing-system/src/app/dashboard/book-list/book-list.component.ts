import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsModalComponent } from '../book-details-modal/book-details-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: any[] = [];
  searchTerm: string = '';
  filteredBooks: any[] = [];
  selectedFilter: string = 'all';

  private bookBorrowedSubscription!: Subscription;

  constructor(private bookService: BooksService, public dialog: MatDialog) { }
  

  ngOnInit() {

    this.loadBooks();
    this.bookBorrowedSubscription = this.bookService.bookBorrowed$().subscribe(() => {
      // Reload books when a book is borrowed
      this.loadBooks();
    });
    // this.bookService.getAllBooks().subscribe(
    //   data=>{
    //     // this.books = data;

    //     // const storedBooks = localStorage.getItem('Books');

    //     // if (storedBooks !== null) {
    //     //   const newBook = JSON.parse(storedBooks);
  
    //     //   if (Array.isArray(newBook)) {
    //     //     this.books = [...newBook, ...this.books];
    //     //   } else {
    //     //     this.books = [newBook, ...this.books];
    //     //   }
    //     // }
  
    //     // console.log(this.books);
    //     this.books = data;
        
    //   }
    // )
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.bookBorrowedSubscription.unsubscribe();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe(
      (data: any[]) => {
        this.books = data;
        this.applyFilter();
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

  openBookDetailsModal(book: any): void {
    const dialogRef = this.dialog.open(BookDetailsModalComponent, {
      width: '400px', // Set the desired width
      data: { book } // Pass data to the modal
    });

  }
  

}
