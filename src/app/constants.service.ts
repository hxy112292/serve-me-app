import { Injectable } from '@angular/core';
import {User} from './entity/user';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  readonly baseUrl: string = 'https://serve-me-hxy.herokuapp.com';
  user: User;


  constructor() {
    this.user = {
      id: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      role: ''
    };
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }


}
