
import { DefaultNgxSelectIntlService, NgxSelectIntlService } from './ngx-select-intl.service';
import { TestBed } from '@angular/core/testing';

describe('NgxSelectIntlService', () => {
  let service: DefaultNgxSelectIntlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultNgxSelectIntlService],
    });
    service = TestBed.inject(DefaultNgxSelectIntlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculatePlaceholder', () => {
    it('should return placeholder for no values selected', () => {
      const options: string[] = [];

      const placeholder = service.calculatePlaceHolder(options, 10, undefined);

      expect(placeholder).toBe(service.searchFieldPlaceholder);
    });
    it('should return the given placeholder for no values selected', () => {
      const options: string[] = [];

      const placeholder = service.calculatePlaceHolder(options, 10, 'return me');

      expect(placeholder).toBe('return me');
    });
    it('should return label for up to 3 values selected', () => {
      const options: string[] = [
        'a',
        '1',
        'bA',
      ];

      const placeholder = service.calculatePlaceHolder(options, 10, undefined);

      expect(placeholder).toBe('a, 1, bA selected');
    });
    it('should return n-selected for more than 3 values selected', () => {
      const options = [
        'a',
        '1',
        'bA',
        'test',
      ];

      const placeholder = service.calculatePlaceHolder(options, 10, undefined);

      expect(placeholder).toBe('4 selected');
    });

    it('should return all selected', () => {
      const options = [
        'a',
        '1',
        'bA',
        'test',
      ];

      const placeholder = service.calculatePlaceHolder(options, 4, undefined);

      expect(placeholder).toBe('all');
    });
  });
});
