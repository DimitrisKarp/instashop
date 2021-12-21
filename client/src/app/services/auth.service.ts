import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { BehaviorSubject, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject(Parse.User.current());
  constructor() {}

  async login(username: string, password: string) {
    await Parse.User.logIn(username, password);
    this.user.next(Parse.User.current());
  }

  async logout() {
    await Parse.User.logOut();
    this.user.next(Parse.User.current());
  }

  get currentUser() {
    return this.user;
  }

  get isAuthenticated() {
    return Parse.User.current()?.authenticated();
  }
}
