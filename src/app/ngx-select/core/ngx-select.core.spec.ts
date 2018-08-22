import { NgxSelect } from './ngx-select.core';
import { NgxSelectModel } from './ngx-select.model';

describe('NgxSelect', () => {
  let ngxSelect: NgxSelect<string>;

  beforeEach(() => {
    ngxSelect = new NgxSelect<string>();
  });

  describe('toggleVisibility', () => {
    it('should toggle from false to true', () => {
      ngxSelect.hidden = false;
      ngxSelect.toggleVisibility();
      expect(ngxSelect.hidden).toBe(true);
    });
    it('should toggle from true to false', () => {
      ngxSelect.hidden = true;
      ngxSelect.toggleVisibility();
      expect(ngxSelect.hidden).toBe(false);
    });
    it('should toggle from false to true to false', () => {
      ngxSelect.hidden = false;
      ngxSelect.toggleVisibility();
      ngxSelect.toggleVisibility();
      expect(ngxSelect.hidden).toBe(false);
    });
    it('should toggle from true to false to true', () => {
      ngxSelect.hidden = true;
      ngxSelect.toggleVisibility();
      ngxSelect.toggleVisibility();
      expect(ngxSelect.hidden).toBe(true);
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
      ngxSelect.selectOptions = [
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1'},
      ];

      ngxSelect.toggleAllNoneSelected();

      const result = ngxSelect.selectOptions.filter(item => item.selected).length;
      expect(result).toEqual(3);
    });
    it('should set all to selected if more are unselected', () => {
      ngxSelect.selectOptions = [
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1', selected: false},
        {label: '1', value: '1'},
      ];

      ngxSelect.toggleAllNoneSelected();

      const result = ngxSelect.selectOptions.filter(item => item.selected).length;
      expect(result).toEqual(3);
    });
    it('should set all to unselected if all are selected', () => {
      ngxSelect.selectOptions = [
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1', selected: true},
        {label: '1', value: '1', selected: true},
      ];

      ngxSelect.toggleAllNoneSelected();

      const result = ngxSelect.selectOptions.filter(item => item.selected).length;
      expect(result).toEqual(0);
    });
  });
});
