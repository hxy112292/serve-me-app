import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerCenterPage } from './customer-center.page';

describe('CustomerCenterPage', () => {
  let component: CustomerCenterPage;
  let fixture: ComponentFixture<CustomerCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCenterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
