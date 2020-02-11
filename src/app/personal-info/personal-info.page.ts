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

  constructor(private http: HttpClient,
              private constant: ConstantsService,
              private router: Router) {
  }

  ngOnInit() {
  }

  update() {
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
