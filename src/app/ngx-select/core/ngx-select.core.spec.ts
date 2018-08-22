import { NgxSelect, NgxSelect } from './ngx-select.core';

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
});
