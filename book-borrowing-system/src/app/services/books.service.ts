import { Injectable, NgZone } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { IBook } from '../model/IBook';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class BooksService {
  private bookBorrowedSubject = new BehaviorSubject<boolean>(false);

    constructor(private http:HttpClient, private ngZone: NgZone) { }

    getAllBooks(): Observable<string[]> {
      // return this.http.get('data/books.json')
      return this.http.get<string[]>('https://localhost:7223/api/Books/GetBooks');
    }

    // addBook(book: IBook) {
    //     let books = [];
    //     const storedBooks = localStorage.getItem('Books');
      
    //     if (storedBooks) {
    //       books = JSON.parse(storedBooks);
    //     }
      
    //     books.push(book);

    //     localStorage.setItem('Books', JSON.stringify(books));
    //   

    // addBook(book: IBook): Observable<any> {
    //   console.log(localStorage.getItem('token'));
    //   const httpOptions = {
    //     headers: new HttpHeaders({
    //       'Authorization': 'Bearer '+ localStorage.getItem('token')
    //     })
    //   };
  
    //   return this.http.post('https://localhost:7223/api/Books/AddBook', book, httpOptions);
    // }
    

    addBook(book: IBook): Observable<any> {
      //console.log(localStorage.getItem('token'));
      
  
      return this.http.post('https://localhost:7223/api/Books/AddBook', book);
    }
    

    borrowBook(email: string, bookId: number): Observable<any> {
      const borrowRequest = {
        email: email,
        bookId: bookId
      };
      return this.http.post('https://localhost:7223/api/Borrow/borrow', borrowRequest,{ responseType: 'text' });
    }

    bookBorrowed() {
      this.ngZone.run(() => {
        this.bookBorrowedSubject.next(true);
      });
    }
  
    // Observable to subscribe for book borrowed events
    bookBorrowed$(): Observable<boolean> {
      return this.bookBorrowedSubject.asObservable();
    }

        // let books = this.getStoredBooks();
        // books.push(book);
        // this.updateStoredBooks(books);
      
    
      // updateBook(updatedBook: IBook) {
      //   let books = this.getStoredBooks();
      //   const index = books.findIndex(book => book.Id === updatedBook.Id);
    
      //   if (index !== -1) {
      //     books[index] = updatedBook;
      //     this.updateStoredBooks(books);
      //   }
      // }
    
      // private getStoredBooks(): IBook[] {
      //   const storedBooks = localStorage.getItem('Books');
      //   return storedBooks ? JSON.parse(storedBooks) : [];
      // }
    
      // private updateStoredBooks(books: IBook[]) {
      //   localStorage.setItem('Books', JSON.stringify(books));
      // }
    }
