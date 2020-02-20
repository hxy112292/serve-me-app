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

  }

}
