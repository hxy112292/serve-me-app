import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorServiceAddPage } from './vendor-service-add.page';

describe('VendorServiceAddPage', () => {
  let component: VendorServiceAddPage;
  let fixture: ComponentFixture<VendorServiceAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorServiceAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorServiceAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
