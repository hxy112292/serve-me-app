import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  readonly baseUrl: string = 'https://serve-me-hxy.herokuapp.com';
  uid = '1';
  username = 'Username';

  constructor() { }
}
