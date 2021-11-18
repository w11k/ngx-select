import { NgxSelect } from './ngx-select.core';
import { NgxSelectModel } from './ngx-select.model';
import {  TestBed } from '@angular/core/testing';
import { DefaultNgxSelectIntlService } from '@w11k/ngx-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

describe('NgxSelect', () => {

  let ngxSelect: NgxSelect<string>;

  class NgxSelectorComp<T> extends NgxSelect<T> {
    constructor() {
      super(new DefaultNgxSelectIntlService());
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxSelect],
      imports: [ReactiveFormsModule,
        MatFormFieldModule,
        FormsModule,
        MatIconModule,
      ]
    });
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

  describe('toggleAllNoneSelected', () => {
    it('should set all to selected if one is unselected', () => {
      ngxSelect.setOriginalOptions([
        {label: '1', value: '1'},
        {label: '2', value: '1'},
        {label: '3', value: '1'},
      ]);

      ngxSelect.toggleAllNoneSelected();

      const result = Object.values(ngxSelect.checkboxGroup.value).filter(value => value === true).length;
      expect(result).toEqual(3);
    });
    it('should set all to selected if more are unselected', () => {
      ngxSelect.setOriginalOptions([
        {label: '1', value: '1'},
        {label: '2', value: '1'},
        {label: '3', value: '1'},
      ]);

      ngxSelect.checkboxGroup.patchValue({
        ['1']: true,
      });

      ngxSelect.toggleAllNoneSelected();

      const result = Object.values(ngxSelect.checkboxGroup.value).filter(value => value === true).length;
      expect(result).toEqual(3);
    });
    it('should set all to unselected if all are selected', () => {
      ngxSelect.setOriginalOptions([
        {label: '1', value: '1'},
        {label: '2', value: '1'},
        {label: '3', value: '1'},
      ]);

      ngxSelect.checkboxGroup.patchValue({
        ['1']: true,
        ['2']: true,
        ['3']: true,
      });

      ngxSelect.toggleAllNoneSelected();

      const result = Object.values(ngxSelect.checkboxGroup.value).filter(value => value === true).length;
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

    it('should tolerate writeValue with null value because Angular calls without our control', () => {
      try {
        ngxSelect.writeValue(null as any);
        ngxSelect.writeValue(undefined as any);
      } catch (e) {
        fail('Should not happen but got ' + e);
      }
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

    it('should filter options with last string with new options', () => {
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
    });

    it('should filter case sensitive correctly', () => {
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
    });
  });
});
