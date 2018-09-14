import { NgxSelectModel } from './ngx-select.model';
import { FormControl } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';

export class NgxSelect<T> implements OnDestroy {
  private _originalOptions: NgxSelectModel<T>[] = [];
  private _internalOptionsCopy: NgxSelectModel<T>[] = [];
  private filterSubscription: Subscription;
  private lastFilterQuery = '';

  visibleOptions$: ReplaySubject<NgxSelectModel<T>[]> = new ReplaySubject(1);
  filterControl: FormControl = new FormControl('');
  visible = false;
  placeholder = '';

  constructor() {
    this.visibleOptions$.next([]);
    this.filterSubscription = this.filterControl.valueChanges.pipe(
      // debounceTime(300),
    ).subscribe(filterQuery => {
      const filteredOptions = this.filterOptions(this._internalOptionsCopy, filterQuery);
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
    const newOptions = this._internalOptionsCopy.map(option => {
      if (option.label === item.label) {
        return {
          ...option,
          selected: !option.selected,
        } ;
      } else {
        return option;
      }
    });

    this.setInternalOptions(newOptions);
  }

  toggleAllNoneSelected() {
    if (this.isAllSelected(this._internalOptionsCopy)) {
      this.setInternalOptions(this._internalOptionsCopy.map(item => ({...item, selected: false})));
    } else {
      this.setInternalOptions(this._internalOptionsCopy.map(item => ({...item, selected: true})));
    }
  }

  isAllSelected(options: NgxSelectModel<T>[]) {
    return options.filter(item => !item.selected).length === 0;
  }

  filterOptions(options: NgxSelectModel<T>[], filterQuery: string): NgxSelectModel<T>[] {
    const filterToLowerCase = filterQuery.toLowerCase();
    this.lastFilterQuery = filterToLowerCase;
    return options.filter(item => item.label.toLowerCase().includes(filterToLowerCase));
  }

  private setInternalOptions(value: NgxSelectModel<T>[]) {
    this._internalOptionsCopy = value;
    const filteredOptions = this.filterOptions(value, this.lastFilterQuery);
    this.visibleOptions$.next(filteredOptions);
    this.placeholder = this.calculatePlaceHolder(value);
  }

  calculatePlaceHolder(value: NgxSelectModel<T>[]) {
    const countSelectedItems = value.filter(item => item.selected).length;

    if (countSelectedItems === 0) {
      return 'Searchfield';
    } else if (countSelectedItems <= 3) {
      return `${value.filter(item => item.selected).map(item => item.label).join(', ')} selected`;
    } else {
      return `${countSelectedItems} selected`;
    }
  }

  setOriginalOptions(value: NgxSelectModel<T>[]) {
    this._originalOptions = value;
    this.setInternalOptions(value.slice());
  }

  get originalOptions() {
    return this._originalOptions;
  }

  get internalOptions() {
    return this._internalOptionsCopy;
  }

  resetFilter() {
    this.filterControl.reset('');
  }
}
