import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorOrderPage } from './vendor-order.page';

describe('VendorOrderPage', () => {
  let component: VendorOrderPage;
  let fixture: ComponentFixture<VendorOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
