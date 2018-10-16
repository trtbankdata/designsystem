import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContactExampleComponent } from './card-contact-example.component';

describe('CardContactExampleComponent', () => {
  let component: CardContactExampleComponent;
  let fixture: ComponentFixture<CardContactExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardContactExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardContactExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
