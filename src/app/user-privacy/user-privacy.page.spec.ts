import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserPrivacyPage } from './user-privacy.page';

describe('UserPrivacyPage', () => {
  let component: UserPrivacyPage;
  let fixture: ComponentFixture<UserPrivacyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPrivacyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserPrivacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
