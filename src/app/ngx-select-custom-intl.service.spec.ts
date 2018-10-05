import { TestBed } from '@angular/core/testing';

import { NgxSelectCustomIntlService } from './ngx-select-custom-intl.service';

describe('NgxSelectCustomIntlService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [NgxSelectCustomIntlService]
  }));

  it('should be created', () => {
    const service: NgxSelectCustomIntlService = TestBed.get(NgxSelectCustomIntlService);
    expect(service).toBeTruthy();
  });
});
