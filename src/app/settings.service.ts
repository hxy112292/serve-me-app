import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject
// tslint:disable-next-line:import-blacklist
} from 'rxjs/Rx';


@Injectable()
export class SettingsService {
  theme: BehaviorSubject < string > ;
  constructor() {
    this.theme = new BehaviorSubject('dark-theme');
  }
  setActiveTheme(val) {
    this.theme.next(val);
  }

  getActiveTheme() {
    return this.theme.asObservable();
  }

}