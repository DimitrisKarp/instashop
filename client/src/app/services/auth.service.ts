import { Injectable } from '@angular/core';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  async login(username: string, password: string) {
    await Parse.User.logIn(username, password);
  }

  async logout() {
    await Parse.User.logOut();
  }

  get currentUser() {
    return Parse.User.current();
  }

  handleParseError(err: any) {
    switch (err.code) {
      case Parse.Error.INVALID_SESSION_TOKEN:
        this.logout();
        break;
    }
  }
}
