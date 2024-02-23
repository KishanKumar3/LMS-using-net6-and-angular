import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserForLogin, UserForRegister } from '../model/IUser';
import {JwtHelperService} from '@auth0/angular-jwt';



@Injectable()
export class AuthService {
  baseUrl = environment.baseUrl;
  private userPayload: any;



constructor(private http: HttpClient) { 
  this.userPayload = this.decodedToken();
}

authUser(user: UserForLogin) {

    // return this.http.post(this.baseUrl + '/Account/login', user)
    return this.http.post('https://localhost:7223/api/Account/login', user,{ responseType: 'text' });

    // let userArray: any[] = [];
    // const storedUsers = localStorage.getItem('Users');
  
    // if (storedUsers !== null) {
    //   userArray = JSON.parse(storedUsers);
    // }
  
    // return userArray.find(p => p.email === user.email && p.pass === user.pass);
  }

  registerUser(user: UserForRegister) {
    return this.http.post('https://localhost:7223/api/Account/signup', user);
}



decodedToken() {
  const jwtHelper = new JwtHelperService();
  const token = localStorage.getItem('token')!;
  // console.log(jwtHelper.decodeToken(token))
  return jwtHelper.decodeToken(token);
}

getEmailFromToken() {
  if(this.userPayload) {
    return this.userPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

  }
}


}
