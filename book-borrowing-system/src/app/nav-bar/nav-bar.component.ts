import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})



export class NavBarComponent implements OnInit {

  loggedinUser: any;
  public email: string = "";
  public name: string = "";
  public tokens: number = 0;

  constructor(private alertifyService: AlertifyService, private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    //this.fetchLoggedInUserDetails();
    this.userService.getEmail().subscribe(val => {
      let emailFromToken = this.authService.getEmailFromToken();
      this.email = val || emailFromToken
      //console.log("here",this.email)
      this.userService.getUserByEmail(this.email).subscribe((data : any)=> {
        this.loggedinUser = data;
        //console.log(this.loggedinUser.name, this.loggedinUser.tokensAvailable);
        this.name = this.loggedinUser.name;
        this.tokens = this.loggedinUser.tokensAvailable;
      });
    })
  }
  // private fetchLoggedInUserDetails() {
  //   console.log("Email:",this.email);
    
    

    // const token = localStorage.getItem('token');

    // if (token) {
    //   const loggedInEmail = token;

    //   const users = this.userService.getUsers(); // Assuming this method returns an array of IUser

    //   this.loggedinUser = users.find(user => user.email === loggedInEmail) || null;
    // }
  // }

  loggedIn() {
    this.loggedinUser = localStorage.getItem('token');
    return this.loggedinUser;
  }

  onLogout() {
    localStorage.removeItem('token');
    this.alertifyService.success('Logout successful');
    this.router.navigate(['/']);
  }



  // loggedIn() {
  //   const token = localStorage.getItem('token');
  //   this.loggedinUser = token !== null ? token : '';
  //   console.log(this.userService.getUsers());
  //   return this.loggedinUser;
  // }
  // onLogout() {
  //   localStorage.removeItem('token');
  //   this.alertifyService.success('Logout successful');
  //   this.router.navigate(['/']);
  // }
}
