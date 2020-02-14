import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderReviewPage } from './order-review.page';

describe('OrderReviewPage', () => {
  let component: OrderReviewPage;
  let fixture: ComponentFixture<OrderReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderReviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
