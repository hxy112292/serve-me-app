import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorBidDetailPage } from './vendor-bid-detail.page';

describe('VendorBidDetailPage', () => {
  let component: VendorBidDetailPage;
  let fixture: ComponentFixture<VendorBidDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorBidDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorBidDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
