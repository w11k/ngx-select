import { NgxSelect } from './ngx-select.core';
import { NgxSelectModel } from './ngx-select.model';
import { async } from '@angular/core/testing';
import { DefaultNgxSelectIntlService } from './ngx-select-intl.service';

class NgxSelectorComp<T> extends NgxSelect<T> {
  constructor() {
    super(new DefaultNgxSelectIntlService());
  }
  emitUpdateValues(changeValues: NgxSelectModel<T>[]): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }
}

describe('NgxSelect', () => {
  let ngxSelect: NgxSelect<string>;

  beforeEach(() => {
    ngxSelect = new NgxSelectorComp<string>();
  });

  describe('toggleVisibility', () => {
    it('should toggle from false to true', () => {
      ngxSelect.visible = false;
      ngxSelect.toggleVisibility();
      expect(ngxSelect.visible).toBe(true);
    });
    it('should toggle from true to false', () => {
      ngxSelect.visible = true;
      ngxSelect.toggleVisibility();
      expect(ngxSelect.visible).toBe(false);
    });
    it('should toggle from false to true to false', () => {
      ngxSelect.visible = false;
      ngxSelect.toggleVisibility();
      ngxSelect.toggleVisibility();
      expect(ngxSelect.visible).toBe(false);
    });
    it('should toggle from true to false to true', () => {
      ngxSelect.visible = true;
      ngxSelect.toggleVisibility();
      ngxSelect.toggleVisibility();
      expect(ngxSelect.visible).toBe(true);
    });
  });

  describe('isAllSelected', () => {
    it('should return true if all options are selected', () => {
      const options: NgxSelectModel<string>[] = [
        {label: '1', value: '1'},
        {label: '1', value: '1'},
        {label: '1', value: '1'},
      ];

      const selectedOptions: NgxSelectModel<string>[] = [
        {label: '1', value: '1'},
        {label: '1', value: '1'},
        {label: '1', value: '1'},
      ];

      expect(ngxSelect.isAllSelected(options, selectedOptions)).toBe(true);
    });
    it('should return false if one options is unselected', () => {
      const options: NgxSelectModel<string>[] = [
        {label: '1', value: '1'},
        {label: '1', value: '1'},
        {label: '1', value: '1'},
      ];

      const selectedOptions: NgxSelectModel<string>[] = [
        {label: '1', value: '1'},
        {label: '1', value: '1'},
      ];

      expect(ngxSelect.isAllSelected(options, selectedOptions)).toBe(false);
    });
    it('should return false if more options are unselected', () => {
      const options: NgxSelectModel<string>[] = [
        {label: '1', value: '1'},
        {label: '1', value: '1'},
        {label: '1', value: '1'},
      ];

      expect(ngxSelect.isAllSelected(options, [])).toBe(false);
    });
  });

  describe('toggleAllNoneSelected', () => {
    it('should set all to selected if one is unselected', () => {
      ngxSelect.setOriginalOptions([
        {label: '1', value: '1'},
        {label: '1', value: '1'},
        {label: '1', value: '1'},
      ]);

      ngxSelect.toggleAllNoneSelected();

      const result = ngxSelect.selectedOptions.length;
      expect(result).toEqual(3);
    });
    it('should set all to selected if more are unselected', () => {
      ngxSelect.setOriginalOptions([
        {label: '1', value: '1'},
        {label: '1', value: '1'},
        {label: '1', value: '1'},
      ]);

      ngxSelect.selectedOptions = [
        {label: '1', value: '1'},
      ];

      ngxSelect.toggleAllNoneSelected();

      const result = ngxSelect.selectedOptions.length;
      expect(result).toEqual(3);
    });
    it('should set all to unselected if all are selected', () => {
      ngxSelect.setOriginalOptions([
        {label: '1', value: '1'},
        {label: '1', value: '1'},
        {label: '1', value: '1'},
      ]);

      ngxSelect.selectedOptions = [
        {label: '1', value: '1'},
        {label: '1', value: '1'},
        {label: '1', value: '1'},
      ];

      ngxSelect.toggleAllNoneSelected();

      const result = ngxSelect.selectedOptions.length;
      expect(result).toEqual(0);
    });
  });

  describe('filterContent', () => {
    it('should filter the list based on a string', () => {
      const filterString = 'a';

      const options = [
        {label: 'a', value: 'a'},
        {label: 'A', value: 'A'},
        {label: 'b', value: 'b'},
        {label: '1', value: '1'},
        {label: 'ba', value: 'ba'},
        {label: 'bA', value: 'bA'},
        {label: 'b1', value: 'b1'},
        {label: 'b 1', value: 'b 1'},
        {label: 'b a', value: 'b a'},
        {label: 'b A', value: 'b A'},
      ];

      const result: NgxSelectModel<string>[] = ngxSelect.filterOptions(options, filterString);
      const resultLabels = result.map(i => i.label);

      expect(result.length).toBe(6);
      expect(resultLabels.includes('b')).toBeFalsy();
      expect(resultLabels.includes('1')).toBeFalsy();
      expect(resultLabels.includes('b1')).toBeFalsy();
      expect(resultLabels.includes('b 1')).toBeFalsy();
    });
    it('should filter the list based on a number', () => {
      const filterString = '1';

      const options = [
        {label: 'a', value: 'a'},
        {label: 'A', value: 'A'},
        {label: 'b', value: 'b'},
        {label: '1', value: '1'},
        {label: 'ba', value: 'ba'},
        {label: 'bA', value: 'bA'},
        {label: 'b1', value: 'b1'},
        {label: 'b 1', value: 'b 1'},
        {label: 'b a', value: 'b a'},
        {label: 'b A', value: 'b A'},
      ];

      const result: NgxSelectModel<string>[] = ngxSelect.filterOptions(options, filterString);
      const resultLabels = result.map(i => i.label);

      expect(result.length).toBe(3);
      expect(resultLabels.includes('1')).toBeTruthy();
      expect(resultLabels.includes('b1')).toBeTruthy();
      expect(resultLabels.includes('b 1')).toBeTruthy();
    });
    it('should filter the list based on mixed input', () => {
      const filterString = 'b1';

      const options = [
        {label: 'a', value: 'a'},
        {label: '1', value: '1'},
        {label: 'bA', value: 'bA'},
        {label: 'b1', value: 'b1'},
        {label: 'b 1', value: 'b 1'},
        {label: 'b A', value: 'b A'},
        {label: 'b1 A', value: 'b1 A'},
        {label: 'A b1', value: 'A b1'},
        {label: 'A1 b1', value: 'A1 b1'},
      ];

      const result: NgxSelectModel<string>[] = ngxSelect.filterOptions(options, filterString);
      const resultLabels = result.map(i => i.label);

      expect(result.length).toBe(4);
      expect(resultLabels.includes('b1')).toBeTruthy();
      expect(resultLabels.includes('b1 A')).toBeTruthy();
      expect(resultLabels.includes('A b1')).toBeTruthy();
      expect(resultLabels.includes('A1 b1')).toBeTruthy();
    });

    it('should filter nothing with empty input', () => {
      const filterString = '';

      const options = [
        {label: 'a', value: 'a'},
        {label: '1', value: '1'},
        {label: 'bA', value: 'bA'},
        {label: 'b1', value: 'b1'},
        {label: 'b 1', value: 'b 1'},
        {label: 'b A', value: 'b A'},
        {label: 'b1 A', value: 'b1 A'},
        {label: 'A b1', value: 'A b1'},
        {label: 'A1 b1', value: 'A1 b1'},
      ];

      const result: NgxSelectModel<string>[] = ngxSelect.filterOptions(options, filterString);

      expect(result.length).toBe(9);
    });

    it('should filter options with last string with new options', async(() => {
      const filterString = '1';

      const options = [
        {label: 'a', value: 'a'},
        {label: '1', value: '1'},
        {label: 'bA', value: 'bA'},
        {label: 'b1', value: 'b1'},
        {label: 'b 1', value: 'b 1'},
        {label: 'b A', value: 'b A'},
      ];

      const result: NgxSelectModel<string>[] = ngxSelect.filterOptions(options, filterString);
      expect(result.length).toBe(3);

      ngxSelect.setOriginalOptions(options);
      ngxSelect.visibleOptions$.subscribe(visibleOptions => {
        expect(visibleOptions.length).toBe(3);
      });
    }));

    it('should filter case sensitive correctly', async(() => {
      const filterString = 'Label';

      const options = [
        {label: 'Label 1', value: 'Label 1'},
        {label: 'label', value: 'label'},
        {label: 'label 1', value: 'label 1'},
        {label: 'Label', value: 'Label'},
        {label: 'b1', value: 'b1'},
        {label: 'b 1', value: 'b 1'},
        {label: 'b A', value: 'b A'},
      ];

      const result: NgxSelectModel<string>[] = ngxSelect.filterOptions(options, filterString);
      expect(result.length).toBe(4);

      ngxSelect.setOriginalOptions(options);
      ngxSelect.visibleOptions$.subscribe(visibleOptions => {
        expect(visibleOptions.length).toBe(4);
      });
    }));
  });

  describe('changeCheckbox', () => {

    it('should change from false to true', async(() => {

      ngxSelect.setOriginalOptions([
        {label: '1', value: '1'},
      ]);

      ngxSelect.changeCheckbox({label: '1', value: '1'});

      const firstCheckbox = ngxSelect.selectedOptions;

      expect(firstCheckbox.length).toBe(1);
    }));

    it('should change from true to false', async(() => {

      ngxSelect.selectedOptions = [
        {label: '1', value: '1'},
      ];

      ngxSelect.changeCheckbox({label: '1', value: '1'});

      const firstCheckbox = ngxSelect.selectedOptions;

      expect(firstCheckbox.length).toBe(0);
    }));

    it('should only change specific element', async(() => {

      ngxSelect.setOriginalOptions([
        {label: '1', value: '1'},
        {label: '2', value: '2'},
      ]);

      ngxSelect.changeCheckbox({label: '1', value: '1'});

      const firstCheckbox = ngxSelect.selectedOptions.filter(item => item.label === '1')[0];
      const secondCheckbox = ngxSelect.selectedOptions.filter(item => item.label === '2')[0];

      expect(firstCheckbox).toBeDefined();
      expect(secondCheckbox).toBeUndefined();
    }));
  });
});
