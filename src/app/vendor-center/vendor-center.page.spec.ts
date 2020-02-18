import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorCenterPage } from './vendor-center.page';

describe('VendorCenterPage', () => {
  let component: VendorCenterPage;
  let fixture: ComponentFixture<VendorCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorCenterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
