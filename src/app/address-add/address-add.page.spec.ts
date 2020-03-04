import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddressAddPage } from './address-add.page';

describe('AddressAddPage', () => {
  let component: AddressAddPage;
  let fixture: ComponentFixture<AddressAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddressAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
