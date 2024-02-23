import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BookCardComponent } from './dashboard/book-card/book-card.component';
import { BookListComponent } from './dashboard/book-list/book-list.component';
import { BooksService } from './services/books.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { BookDetailsModalComponent } from './dashboard/book-details-modal/book-details-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddNewBookComponent } from './dashboard/add-new-book/add-new-book.component';
import { Routes, RouterModule, Router} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { AddedBooksComponent } from './dashboard/added-books/added-books.component';
import { UserService } from './services/user.service';
import { BorrowedBooksComponent } from './dashboard/borrowed-books/borrowed-books.component';
import { SharedService } from './services/shared.service';



const appRoutes: Routes = [
  {path: '', component: BookListComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'add-new-book', component: AddNewBookComponent},
  {path: 'added-books' , component: AddedBooksComponent},
  {path: 'borrowed-books', component: BorrowedBooksComponent}
]

@NgModule({
  declarations: [		
    AppComponent,
      NavBarComponent,
      BookCardComponent,
      BookListComponent,
      BookDetailsModalComponent,
      AddNewBookComponent,
      UserLoginComponent,
      UserRegisterComponent,
      AddedBooksComponent,
      BorrowedBooksComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    BooksService,
    AlertifyService,
    AuthService,
    UserService,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
