import { TestBed } from '@angular/core/testing';

import { DefaultNgxSelectIntlService, NgxSelectIntlService } from './ngx-select-intl.service';
import { NgxSelectModel } from './ngx-select.model';

describe('NgxSelectIntlService', () => {
  let service: DefaultNgxSelectIntlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultNgxSelectIntlService]
    });
    service = TestBed.get(DefaultNgxSelectIntlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculatePlaceholder', () => {
    it('should return placeholder for no values selected', () => {
      const options: NgxSelectModel<string>[] = [];

      const placeholder = service.calculatePlaceHolder(options);

      expect(placeholder).toBe(service.searchFieldPlaceholder);
    });
    it('should return label for up to 3 values selected', () => {
      const options = [
        {label: 'a', value: 'a', selected: true},
        {label: '1', value: '1', selected: true},
        {label: 'bA', value: 'bA', selected: true},
        {label: 'test', value: 'test'},
      ];

      const placeholder = service.calculatePlaceHolder(options);

      expect(placeholder).toBe('a, 1, bA selected');
    });
    it('should return n-selected for more than 3 values selected', () => {
      const options = [
        {label: 'a', value: 'a', selected: true},
        {label: '1', value: '1', selected: true},
        {label: 'bA', value: 'bA', selected: true},
        {label: 'test', value: 'test', selected: true},
      ];

      const placeholder = service.calculatePlaceHolder(options);

      expect(placeholder).toBe('4 selected');
    });
  });
});
