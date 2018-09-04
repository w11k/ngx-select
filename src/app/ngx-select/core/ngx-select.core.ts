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

  toggleAllNoneSelected() {
    if (this.isAllSelected(this.selectOptions)) {
      this.selectOptions = this.selectOptions.map(item => ({...item, selected: false}));
    } else {
      this.selectOptions = this.selectOptions.map(item => ({...item, selected: true}));
    }
  }

  isAllSelected(options: NgxSelectModel<T>[]) {
    return options.filter(item => !item.selected).length === 0;
  }

  filterOptions(options: NgxSelectModel<T>[], filterText: string): NgxSelectModel<T>[] {
    return options.filter(item => item.label.toLowerCase().includes(filterText));
  }
}
