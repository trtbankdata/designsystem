import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicDatepickerComponent } from './ionic-datepicker.component';

describe('IonicDatepickerComponent', () => {
  let component: IonicDatepickerComponent;
  let fixture: ComponentFixture<IonicDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonicDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
