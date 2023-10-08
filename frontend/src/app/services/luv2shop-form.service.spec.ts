import { TestBed } from '@angular/core/testing';

import { Luv2shopFormService } from './luv2shop-form.service';

describe('Luv2shopFormService', () => {
  let service: Luv2shopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Luv2shopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
