import { Component, OnInit, Inject,Input} from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material/dialog';
import { IBook } from 'src/app/model/IBook';

import { BooksService } from 'src/app/services/books.service';

import { NgZone } from '@angular/core';

import { AlertifyService } from 'src/app/services/alertify.service';
import { Location } from '@angular/common';

import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details-modal.component.html',
  styleUrls: ['./book-details-modal.component.css']

})
export class BookDetailsModalComponent implements OnInit {

  // @Input() book: any;
  @Input() details : { book: IBook; } | undefined;
 // loggedinUser!: IUser ;
 email: string="";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private bookService: BooksService, private alertify : AlertifyService, private userService: UserService, private authService: AuthService, private router: Router, private dialogRef: MatDialogRef<BookDetailsModalComponent>,private ngZone: NgZone) {}

  ngOnInit() {
    
      
    
    // this.fetchLoggedInUserDetails();
  }

  borrowBook() {
    this.userService.getEmail().subscribe(val => {
      let emailFromToken = this.authService.getEmailFromToken();
      this.email = val || emailFromToken
      
    });
    //console.log("Id is:",this.data.book.id);
    //console.log("Email is:", this.email);
    this.bookService.borrowBook(this.email, this.data.book.id).subscribe(
      (res) => {
        // console.log("Borrowed", res)
         this.alertify.success(res);
         this.ngZone.run(() => {
          const tokenPayload = this.authService.decodedToken();
      this.userService.setEmail(tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
      
        });
         this.bookService.bookBorrowed();
         this.dialogRef.close();
        
         
      },
      (error) => {
        this.alertify.error(JSON.parse(error.error).error);
         
        // console.log("Error", error)
      }
    )
      
  }


  isLoggedIn() {
    return localStorage.getItem('token');
  }
  goToLogin() {
    this.dialogRef.close();
    this.router.navigate(['/login']);
    
  }
  // borrowBook() {
  //   const loggedInUserId = this.loggedinUser?.email; // Replace with actual logged-in user id

  //   // Check if the user has at least 1 token
  //   if (this.userService.deductToken(loggedInUserId)) {
  //     // Deduct 1 token from the logged-in user
  //     // Add 1 token to the lending user (book.Lent_By_User_Id)
  //     this.userService.addToken(this.data.book.Lent_By_User_Id);

  //     // Update book availability status
  //     this.data.book.Is_Book_Available = false;

  //     // Update the book in the service (assuming you have a method like updateBook)
  //     this.bookService.updateBook(this.data.book);
  //     this.alertify.success('Book borrowed successfully');
  //     // Optionally: Handle other logic, e.g., update UI, show success message, etc.
  //   } else {
  //     // User doesn't have enough tokens, handle accordingly
  //     this.alertify.error('User does not have enough tokens to borrow a book.');
  //   }
  // }

  // private fetchLoggedInUserDetails() {
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     const loggedInEmail = token;

  //     const users = this.userService.getUsers(); 

  //     this.loggedinUser = users.find(user => user.email === loggedInEmail) || null;
  //   }
  // }

}