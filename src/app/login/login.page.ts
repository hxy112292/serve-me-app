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
    this.http.post(this.constant.baseUrl + '/user/login', {
      username: this.username,
      password: this.password,
    }).subscribe(res => {
      console.log(res);
      this.constant.setUser((res as any).result, this.username);
    });
    this.router.navigate(['/tabs/me']);
  }

  jumpToSignup() {
    this.router.navigate(['tabs/me/signup']);
  }
}
