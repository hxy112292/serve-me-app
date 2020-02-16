import { Component, OnInit } from '@angular/core';
import {User} from '../entity/user';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {

  user: User;

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router) {
    this.user = {
      id: '',
      username: '',
      password: '',
      email: '',
      phone: '',
      role: 'USER'
    };
  }

  ngOnInit() {
    this.user = this.constant.getUser();
  }

  update() {
    if (this.user.username == null || this.user.username === '') {
      alert('you must set a username');
      return;
    }
    if (this.user.username.length < 5) {
      alert('username must have at least 5 letters');
      return;
    }
    if (this.user.password == null || this.user.password === '') {
      alert('you must set a password');
      return;
    }
    if (this.user.password.length < 6) {
      alert('password must have at least 6 digits');
      return;
    }
    if (this.user.email == null || this.user.email === '') {
      alert('you must set a email');
      return;
    }
    if (!this.user.email.match('@')) {
      alert('email format is wrong');
      return;
    }
    if (this.user.phone == null || this.user.phone === '') {
      alert('you must set a phone');
      return;
    }
    if (!(this.user.phone.match('[+][0-9]') || this.user.phone.match('[0-9]')) || this.user.phone.length < 7 ) {
      alert('you must set a right phone number');
      return;
    }
    this.http.put(this.constant.baseUrl + '/user/update', this.constant.getUser()).subscribe(res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        return;
      }
      this.constant.setUser((res as any).result);
    });
    this.router.navigate(['/tabs/me']);
  }
}
