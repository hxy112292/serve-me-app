import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchVendorPage } from './search-vendor.page';

describe('SearchVendorPage', () => {
  let component: SearchVendorPage;
  let fixture: ComponentFixture<SearchVendorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchVendorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchVendorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
