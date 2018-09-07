import { NgxSelect } from './ngx-select.core';
import { NgxSelectModel } from './ngx-select.model';
import { async } from '@angular/core/testing';

describe('NgxSelect', () => {
  let ngxSelect: NgxSelect<string>;

  beforeEach(() => {
    ngxSelect = new NgxSelect<string>();
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
      const selectOptions: NgxSelectModel<string>[] = [
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1', selected: true},
      ];

      expect(ngxSelect.isAllSelected(selectOptions)).toBe(true);
    });
    it('should return false if one options is unselected', () => {
      const selectOptions: NgxSelectModel<string>[] = [
        {label: '1', value: '1', selected: false},
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1', selected: true},
      ];

      expect(ngxSelect.isAllSelected(selectOptions)).toBe(false);
    });
    it('should return false if more options are unselected', () => {
      const selectOptions: NgxSelectModel<string>[] = [
        {label: '1', value: '1', selected: false},
        {label: '1', value: '1', selected: false},
        {label: '1', value: '1', selected: true},
      ];

      expect(ngxSelect.isAllSelected(selectOptions)).toBe(false);
    });
    it('should return false if one selected is undefined', () => {
      const selectOptions: NgxSelectModel<string>[] = [
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1'},
      ];

      expect(ngxSelect.isAllSelected(selectOptions)).toBe(false);
    });
    it('should return false if more selected is undefined', () => {
      const selectOptions: NgxSelectModel<string>[] = [
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1'},
        {label: '1', value: '1'},
      ];

      expect(ngxSelect.isAllSelected(selectOptions)).toBe(false);
    });
  });

  describe('toggleAllNoneSelected', () => {
    it('should set all to selected if one is unselected', () => {
      ngxSelect.setOriginalOptions([
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1'},
      ]);

      ngxSelect.toggleAllNoneSelected();

      const result = ngxSelect.originalOptions.filter(item => item.selected).length;
      expect(result).toEqual(3);
    });
    it('should set all to selected if more are unselected', () => {
      ngxSelect.setOriginalOptions([
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1', selected: false},
        {label: '1', value: '1'},
      ]);

      ngxSelect.toggleAllNoneSelected();

      const result = ngxSelect.originalOptions.filter(item => item.selected).length;
      expect(result).toEqual(3);
    });
    it('should set all to unselected if all are selected', () => {
      ngxSelect.setOriginalOptions([
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1', selected: true},
      ]);

      ngxSelect.toggleAllNoneSelected();

      const result = ngxSelect.originalOptions.filter(item => item.selected).length;
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
  });

  describe('changeCheckbox', () => {

    it('should change from false to true', async(() => {

      ngxSelect.setOriginalOptions([
        {label: '1', value: '1'},
      ]);

      ngxSelect.changeCheckbox({label: '1', value: '1'});

      const firstCheckbox = ngxSelect.originalOptions.filter(item => item.label === '1');

      expect(firstCheckbox.length).toBe(1);
      expect(firstCheckbox[0].selected).toBeTruthy();
    }));

    it('should change from true to false', async(() => {

      ngxSelect.setOriginalOptions([
        {label: '1', value: '1', selected: true},
      ]);

      ngxSelect.changeCheckbox({label: '1', value: '1'});

      const firstCheckbox = ngxSelect.originalOptions.filter(item => item.label === '1');

      expect(firstCheckbox.length).toBe(1);
      expect(firstCheckbox[0].selected).toBeFalsy();
    }));

    it('should only change specific element', async(() => {

      ngxSelect.setOriginalOptions([
        {label: '1', value: '1', selected: false},
        {label: '2', value: '2', selected: false},
      ]);

      ngxSelect.changeCheckbox({label: '1', value: '1'});

      const firstCheckbox = ngxSelect.originalOptions.filter(item => item.label === '1')[0];
      const secondCheckbox = ngxSelect.originalOptions.filter(item => item.label === '2')[0];

      expect(firstCheckbox).toBeDefined();
      expect(firstCheckbox.selected).toBeTruthy();

      expect(secondCheckbox).toBeDefined();
      expect(secondCheckbox.selected).toBeFalsy();
    }));
  });

  describe('calculatePlaceholder', () => {
    it('should return placeholder for no values selected', () => {
      const options: NgxSelectModel<string>[] = [];

      const placeholder = ngxSelect.calculatePlaceHolder(options);

      expect(placeholder).toBe('Searchfield');
    });
    it('should return label for up to 3 values selected', () => {
      const options = [
        {label: 'a', value: 'a', selected: true},
        {label: '1', value: '1', selected: true},
        {label: 'bA', value: 'bA', selected: true},
        {label: 'test', value: 'test'},
      ];

      const placeholder = ngxSelect.calculatePlaceHolder(options);

      expect(placeholder).toBe('a, 1, bA selected');
    });
    it('should return n-selected for more than 3 values selected', () => {
      const options = [
        {label: 'a', value: 'a', selected: true},
        {label: '1', value: '1', selected: true},
        {label: 'bA', value: 'bA', selected: true},
        {label: 'test', value: 'test', selected: true},
      ];

      const placeholder = ngxSelect.calculatePlaceHolder(options);

      expect(placeholder).toBe('4 selected');
    });
  });
});
