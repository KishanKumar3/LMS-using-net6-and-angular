import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { BooksService } from 'src/app/services/books.service';
import { IBook } from 'src/app/model/IBook';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

  addBookForm! : FormGroup;
  loggedinUser! : string;
  
  book: IBook = { Id:0, Name: "", Author: "", Genre: "", Rating:0,Description: "", LentByUserId: "" , IsBookAvailable:true,CurrentlyBorrowedByUserId: ""};

  constructor(private http: HttpClient , private fb: FormBuilder, private alertify: AlertifyService, private bookService: BooksService, private router : Router) { }

  ngOnInit() {
    this.createAddBookForm();
    const token = localStorage.getItem('token');
    this.loggedinUser = token !== null ? token : '';
  }

  createAddBookForm() {
    this.addBookForm = this.fb.group({
      Name: ['', Validators.required],
      Author: ['', Validators.required],
      Rating: ['',Validators.required],
      Genre: ['', Validators.required],
      Description: ['', Validators.required],
      LentByUserId: ['', [Validators.required, Validators.email]]
    })
  }

  get Name() {
    return this.addBookForm.get('Name') as FormControl;
  }
  get Author() {
    return this.addBookForm.get('Author') as FormControl;
  }
  get Rating() {
    return this,this.addBookForm.get('Rating') as FormControl;
  }
  get Genre() {
    return this.addBookForm.get('Genre') as FormControl;
  }
  get Description() {
    return this.addBookForm.get('Description') as FormControl;
  }
  get LentByUserId() {
    return this.addBookForm.get('LentByUserId') as FormControl;
  }

  onSubmit() {
    console.log(this.addBookForm)

    if(this.addBookForm.valid) {
      this.mapBook();
      this.bookService.addBook(this.book).subscribe(
        () => {
          this.alertify.success('Book added successfully');
          console.log(this.addBookForm);
          this.router.navigate(['/']);
        } 
      );
    } else {
      this.alertify.error('Kindly provide the required fields');
    }
    
    // if(this.addBookForm.valid) {
    //   this.mapBook();
    //   this.bookService.addBook(this.book)
    //   this.addBookForm.reset();
    // this.alertify.success("Book added successfully");
    // this.router.navigate(['/'])
    // } else {
    //   this.alertify.error("Kindly provide the required fields");
    // }
  }
  


  mapBook() : void {
    this.book.Name = this.Name.value;
    this.book.Author = this.Author.value;
    this.book.Genre = this.Genre.value;
    this.book.Rating = this.Rating.value;
    this.book.Description = this.Description.value;
    this.book.LentByUserId = this.LentByUserId.value;
    this.book.IsBookAvailable = true;
  }



}
