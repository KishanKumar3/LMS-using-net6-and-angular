import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private updateSource = new BehaviorSubject<boolean>(false);
  booksUpdated$ = this.updateSource.asObservable();

  updateBooks() {
    this.updateSource.next(true);
  }

constructor() { }

}
