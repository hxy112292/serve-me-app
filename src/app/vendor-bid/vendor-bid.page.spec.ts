import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorBidPage } from './vendor-bid.page';

describe('VendorBidPage', () => {
  let component: VendorBidPage;
  let fixture: ComponentFixture<VendorBidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBidPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorBidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
