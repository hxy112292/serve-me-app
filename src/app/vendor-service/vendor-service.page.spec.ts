import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorServicePage } from './vendor-service.page';

describe('VendorServicePage', () => {
  let component: VendorServicePage;
  let fixture: ComponentFixture<VendorServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
