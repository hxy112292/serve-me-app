import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  readonly baseUrl: string = 'https://serve-me-hxy.herokuapp.com';
  uid = null;
  username = null;

  constructor() {
    this.uid = null;
    this.username = null;
  }

  setUser(uid: string, username: string) {
    this.uid = uid;
    this.username = username;
  }

  getUid() {
    return this.uid;
  }

  getUserName() {
    return this.username;
  }
}
