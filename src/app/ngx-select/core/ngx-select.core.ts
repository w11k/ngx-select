import { NgxSelectModel } from './ngx-select.model';
import { FormControl } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';

export class NgxSelect<T> implements OnDestroy {
  private _originalOptions: NgxSelectModel<T>[] = [];
  private filterSubscription: Subscription;
  private lastFilterQuery = '';

  visibleOptions$: ReplaySubject<NgxSelectModel<T>[]> = new ReplaySubject(1);
  filterControl: FormControl = new FormControl('');
  visible = false;

  constructor() {
    this.visibleOptions$.next([]);
    this.filterSubscription = this.filterControl.valueChanges.pipe(
      // debounceTime(300),
    ).subscribe(filterQuery => {
      const filteredOptions = this.filterOptions(this._originalOptions, filterQuery);
      this.visibleOptions$.next(filteredOptions);
    });
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }

  toggleVisibility(): void {
    this.visible = !this.visible;
  }

  changeCheckbox(item: NgxSelectModel<T>) {
    const newOptions = this._originalOptions.map(option => {
      if (option.label === item.label) {
        return {
          ...option,
          selected: !option.selected,
        } ;
      } else {
        return option;
      }
    });

    this.setOriginalOptions(newOptions);
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

  filterOptions(options: NgxSelectModel<T>[], filterQuery: string): NgxSelectModel<T>[] {
    this.lastFilterQuery = filterQuery;
    return options.filter(item => item.label.toLowerCase().includes(filterQuery));
  }

  setOriginalOptions(value: NgxSelectModel<T>[]) {
    this._originalOptions = value;
    const filteredOptions = this.filterOptions(value, this.lastFilterQuery);
    this.visibleOptions$.next(filteredOptions);
  }

  get originalOptions() {
    return this._originalOptions;
  }

  resetFilter() {
    this.filterControl.reset('');
  }
}
