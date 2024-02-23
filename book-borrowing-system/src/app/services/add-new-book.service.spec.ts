/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddNewBookService } from './add-new-book.service';

describe('Service: AddNewBook', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddNewBookService]
    });
  });

  it('should ...', inject([AddNewBookService], (service: AddNewBookService) => {
    expect(service).toBeTruthy();
  }));
});
