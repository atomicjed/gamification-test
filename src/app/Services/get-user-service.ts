import {Injectable} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  private userId: string = '';
  private userName: string | undefined = '';

  constructor(private auth: AuthService) {
  }

  async getUserId(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.auth.user$.subscribe(user => {
        if (user && user.sub) {
          this.userId = user.sub;
          resolve(user.sub);
        } else {
          reject('User ID not found');
        }
      });
    });
  }
  async getUserName(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.auth.user$.subscribe(user => {
        if (user && user.name) {
          resolve(user.name);
        } else {
          reject('User ID not found');
        }
      });
    });
  }
}
