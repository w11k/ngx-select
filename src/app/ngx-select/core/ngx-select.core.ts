import { NgxSelectModel } from './ngx-select.model';
import { FormControl } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export class NgxSelect<T> implements OnDestroy {
  private _originalOptions: NgxSelectModel<T>[] = [];
  private filterSubscription: Subscription;
  private lastFilterQuery = '';

  hidden = true;
  visibleOptions: NgxSelectModel<T>[] = [];
  filterControl: FormControl = new FormControl('');

  constructor() {
    this.filterSubscription = this.filterControl.valueChanges.pipe(
      debounceTime(300),
    ).subscribe(filterQuery => {
      this.lastFilterQuery = filterQuery;
      this.visibleOptions = this.filterOptions(this._originalOptions, filterQuery);
    });
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

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
    if (this.isAllSelected(this._originalOptions)) {
      this.setOriginalOptions(this._originalOptions.map(item => ({...item, selected: false})));
    } else {
      this.setOriginalOptions(this._originalOptions.map(item => ({...item, selected: true})));
    }
  }

  isAllSelected(options: NgxSelectModel<T>[]) {
    return options.filter(item => !item.selected).length === 0;
  }

  filterOptions(options: NgxSelectModel<T>[], filterText: string): NgxSelectModel<T>[] {
    return options.filter(item => item.label.toLowerCase().includes(filterText));
  }

  setOriginalOptions(value: NgxSelectModel<T>[]) {
    this._originalOptions = value;
    this.visibleOptions = this.filterOptions(value, this.lastFilterQuery);
  }

  get originalOptions() {
    return this._originalOptions;
  }
}
