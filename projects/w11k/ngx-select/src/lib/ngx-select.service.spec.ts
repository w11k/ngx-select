import { TestBed, inject } from '@angular/core/testing';

import { NgxSelectService } from './ngx-select.service';

describe('NgxSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxSelectService]
    });
  });

  it('should be created', inject([NgxSelectService], (service: NgxSelectService) => {
    expect(service).toBeTruthy();
  }));
});
