import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicButtonComponent } from './ionic-button.component';

describe('IonicButtonComponent', () => {
  let component: IonicButtonComponent;
  let fixture: ComponentFixture<IonicButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonicButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
