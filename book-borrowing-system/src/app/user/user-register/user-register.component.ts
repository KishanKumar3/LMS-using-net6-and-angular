import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { UserForRegister } from 'src/app/model/IUser';

import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerationForm!: FormGroup;
  user!: UserForRegister;
  userSubmitted: boolean = false;
  constructor( private authService: AuthService , private alertify: AlertifyService ) {
  }

  ngOnInit() {
    this.registerationForm = new FormGroup({
      Name: new FormControl('', Validators.required),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required,Validators.minLength(8) ]),
      ConfirmPassword: new FormControl('', [Validators.required])
      
    }, this.passwordMatchingValidator)
  }

  

  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('Password')?.value === fc.get('ConfirmPassword')?.value ? null :
      {notmatched: true }
  };


  get Name() {
    return this.registerationForm.get('Name') as FormControl;
  }
  get Email() {
    return this.registerationForm.get('Email') as FormControl;
  }
  get Password() {
    return this.registerationForm.get('Password') as FormControl;
  }
  get ConfirmPassword() {
    return this.registerationForm.get('ConfirmPassword') as FormControl;
  }

  onSubmit() {
    console.log(this.registerationForm)
    this.userSubmitted = true;
    
    if (this.registerationForm.valid) {
      // this.user = Object.assign(this.user, this.registerationForm.value);
      this.authService.registerUser(this.userData()).subscribe(
        () => {
          this.onReset();
          this.alertify.success("Registered successfully");
        },
        (error: { error: string; }) => {
          console.log(error);
          this.alertify.error("Please use appropriate password");
        }
      );
    } else {
      this.alertify.error("Kindly provide the required fields");
    }
  }


onReset() {
  this.userSubmitted = false;
  this.registerationForm.reset();
}

  userData(): UserForRegister {
    return this.user = {
      name: this.Name.value,
      email: this.Email.value,
      password: this.Password.value,
      confirmPassword : this.ConfirmPassword.value
    }
  }

}
