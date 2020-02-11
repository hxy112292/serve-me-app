import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderUpdatePage } from './order-update.page';

describe('OrderUpdatePage', () => {
  let component: OrderUpdatePage;
  let fixture: ComponentFixture<OrderUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
