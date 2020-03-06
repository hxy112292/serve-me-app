import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddressChoosePage } from './address-choose.page';

describe('AddressChoosePage', () => {
  let component: AddressChoosePage;
  let fixture: ComponentFixture<AddressChoosePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressChoosePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddressChoosePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
