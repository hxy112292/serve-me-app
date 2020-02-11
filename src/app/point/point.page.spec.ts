import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PointPage } from './point.page';

describe('PointPage', () => {
  let component: PointPage;
  let fixture: ComponentFixture<PointPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PointPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
