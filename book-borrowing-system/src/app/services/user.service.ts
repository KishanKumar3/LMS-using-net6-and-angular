import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserService {

  private email$ = new BehaviorSubject<string>("");
  

constructor(private http:HttpClient) { }

public getEmail() {
  return this.email$.asObservable();
}

public setEmail(email: string) {
  this.email$.next(email);
}

getUserByEmail(email: string): Observable<any> {
  return this.http.get(`https://localhost:7223/api/Users/GetUserByEmail/${email}`) 
}

// addUser(user: IUser) {
//     let users: any[] = [];

//     const storedUsers = localStorage.getItem('Users');

//     if (storedUsers !== null) {
//       users = JSON.parse(storedUsers);
//       users = [user, ...users];
//     } else {
//       users = [user];
//     }

//     localStorage.setItem('Users', JSON.stringify(users));
//   }

//   getUsers(): any[] {
//     return this.getUsersFromLocalStorage();
//   }

//   private getUsersFromLocalStorage(): any[] {
//     const storedUsers = localStorage.getItem('Users');

//     if (storedUsers !== null) {
//       return JSON.parse(storedUsers);
//     }

//     return [];
//   }

//   addToken(userId: string): void {
//     const users: IUser[] = this.getUsers();
//     const user = users.find(u => u.email === userId);

//     if (user) {
//       user.tokens += 1;
//       localStorage.setItem('Users', JSON.stringify(users));
//     }
//   }

//   deductToken(userId: string): boolean {
//     const users: IUser[] = this.getUsers();
//     const user = users.find(u => u.email === userId);

//     if (user && user.tokens > 0) {
//       user.tokens -= 1;
//       localStorage.setItem('Users', JSON.stringify(users));
//       return true; // Token deducted successfully
//     }

//     return false; // User doesn't have enough tokens
//   }


}
