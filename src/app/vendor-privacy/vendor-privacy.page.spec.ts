import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendorPrivacyPage } from './vendor-privacy.page';

describe('VendorPrivacyPage', () => {
  let component: VendorPrivacyPage;
  let fixture: ComponentFixture<VendorPrivacyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPrivacyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendorPrivacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
