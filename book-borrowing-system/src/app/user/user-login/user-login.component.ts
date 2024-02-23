import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserForLogin } from 'src/app/model/IUser';
import { UserService } from 'src/app/services/user.service';


@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
    constructor(private authService: AuthService, private alertifyService: AlertifyService, private router: Router, private userService: UserService) { }

    ngOnInit() {
    }

    onLogin(loginForm: NgForm) {
        // console.log(loginForm.value);
        this.authService.authUser(loginForm.value).subscribe(
          (response) => {
            // console.log(response);
            const user = response
            //console.log(user)
            
            localStorage.setItem('token', user)
            const tokenPayload = this.authService.decodedToken();
            this.userService.setEmail(tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
            this.alertifyService.success('Login successful');
            this.router.navigate(['/']);
          },
          (error) => {
            this.alertifyService.error('Invalid Credentials');
          }
          
        );
        // if(token) {
        //   localStorage.setItem('token', token.email)
        //   this.alertifyService.success('Login successful');
        //   this.router.navigate(['/']);
        // } else {
        //   this.alertifyService.error('Incorrect credentials');
        // }
       
    } 


    




}