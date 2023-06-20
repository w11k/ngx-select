import { TestBed } from '@angular/core/testing';

import { NgxSelectCustomIntlService } from './ngx-select-custom-intl.service';
import { DefaultNgxSelectIntlService } from '@w11k/ngx-select';

describe('NgxSelectCustomIntlService', () => {
  let service: NgxSelectCustomIntlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxSelectCustomIntlService, DefaultNgxSelectIntlService]
    });
    service = TestBed.inject(NgxSelectCustomIntlService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
