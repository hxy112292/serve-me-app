import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConstantsService} from '../constants.service';
import {Router} from '@angular/router';
import {url} from '@angular-devkit/schematics';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.username == null || this.username === '') {
      alert('you must set a username');
      return;
    }
    if (this.password == null || this.password === '') {
      alert('you must set a password');
      return;
    }
    this.http.post(this.constant.baseUrl + '/user/login', {
      username: this.username,
      password: this.password,
    }).subscribe(res => {
      if ((res as any).code !== 0) {
        alert((res as any).message);
        return;
      }
      this.constant.setUser((res as any).result);
      localStorage.setItem('uid', this.constant.getUser().id);
      this.router.navigate(['/tabs/me']);
    });
  }

  jumpToSignup() {
    this.router.navigate(['tabs/me/signup']);
  }
}
