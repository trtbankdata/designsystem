import { async, TestBed } from '@angular/core/testing';

import { KirbyModule } from './kirby.module';

describe('KirbyModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KirbyModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(KirbyModule).toBeDefined();
  });
});
