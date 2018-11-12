import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicToggleComponent } from './ionic-toggle.component';

describe('IonicToggleComponent', () => {
  let component: IonicToggleComponent;
  let fixture: ComponentFixture<IonicToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonicToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
