import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetOrderPage } from './set-order.page';

describe('SetOrderPage', () => {
  let component: SetOrderPage;
  let fixture: ComponentFixture<SetOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
