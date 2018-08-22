import { NgxSelectModel } from './ngx-select.model';

export class NgxSelect<T> {
  hidden = true;
  selectOptions: NgxSelectModel<T>[] = [];

  toggleVisibility() {
    this.hidden = !this.hidden;
  }

  setHidden(value: boolean) {
    this.hidden = value;
  }

  changeCheckbox(item: NgxSelectModel<T>) {
    console.log(item);
  }

  changeSelectAllSelectNone() {
    // if (this.isAllSelected(this.selectOptions)) {
    // }
  }

  isAllSelected(options: NgxSelectModel<T>[]) {
    return options.filter(item => !item.selected).length === 0;
  }
}
