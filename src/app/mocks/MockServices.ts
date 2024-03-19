import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockGetUserService {
  getUserId(): Observable<string> {
    return of('mockUserId');
  }
}
export class DoesUserExistMock {
  doesUserExistRequest(userId: string): Observable<Object> {
    if (userId === 'existingUser') {
      return of(true);
    } else {
      return of(false);
    }
  }
}
