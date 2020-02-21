import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinUsPage } from './join-us.page';

describe('JoinUsPage', () => {
  let component: JoinUsPage;
  let fixture: ComponentFixture<JoinUsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinUsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
