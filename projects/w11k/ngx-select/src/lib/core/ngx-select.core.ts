import { NgxSelectModel, NgxSelectToggleState } from './ngx-select.model';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { EventEmitter, OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { NgxSelectIntlService } from './ngx-select-intl.service';

export abstract class NgxSelect<T> implements OnDestroy, ControlValueAccessor {
  private _originalOptions: NgxSelectModel<T>[] = [];
  private _selectedOptions: NgxSelectModel<T>[] = [];
  private filterSubscription: Subscription;
  private lastFilterQuery = '';

  visibleOptions$: ReplaySubject<NgxSelectModel<T>[]> = new ReplaySubject(1);
  filterControl: FormControl = new FormControl('');
  visible = false;
  placeholder = '';
  changeToggleState: EventEmitter<NgxSelectToggleState> = new EventEmitter<NgxSelectToggleState>();

  protected constructor(protected intlService: NgxSelectIntlService) {
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
    if (this._selectedOptions.filter(selected => selected.value === item.value).length > 0) {
      this._selectedOptions = this._selectedOptions.filter(selected => selected.value !== item.value);
    } else {
      this._selectedOptions = [
        ...this._selectedOptions,
        item,
      ];
    }
    this.propagateChange(this._selectedOptions);
  }

  toggleAllNoneSelected() {
    if (this.isAllSelected(this._originalOptions, this._selectedOptions)) {
      this._selectedOptions = [];
      this.changeToggleState.emit(NgxSelectToggleState.NONE);
    } else {
      this._selectedOptions = this._originalOptions.slice();
      this.changeToggleState.emit(NgxSelectToggleState.ALL);
    }
    this.propagateChange(this._selectedOptions);
  }

  isAllSelected(options: NgxSelectModel<T>[], selectedOptions: NgxSelectModel<T>[]) {
    return options.length === selectedOptions.length;
  }

  filterOptions(options: NgxSelectModel<T>[], filterQuery: string): NgxSelectModel<T>[] {
    const filterToLowerCase = filterQuery.toLowerCase();
    this.lastFilterQuery = filterToLowerCase;
    return options.filter(item => item.label.toLowerCase().includes(filterToLowerCase));
  }

  private setVisibleOptions(value: NgxSelectModel<T>[]) {
    const filteredOptions = this.filterOptions(value, this.lastFilterQuery);
    this.visibleOptions$.next(filteredOptions);
  }

  setOriginalOptions(value: NgxSelectModel<T>[]) {
    this._originalOptions = value;
    this.setVisibleOptions(value);
  }

  get originalOptions() {
    return this._originalOptions;
  }

  get selectedOptions() {
    return this._selectedOptions;
  }

  set selectedOptions(values: NgxSelectModel<T>[]) {
    this._selectedOptions = values;
  }

  resetFilter() {
    this.filterControl.reset('');
  }

  abstract emitUpdateValues(changeValues: NgxSelectModel<T>[]): void;

  propagateChange = (_: NgxSelectModel<T>[]) => {
  };

  registerOnChange(fn: (_: NgxSelectModel<T>[]) => any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: NgxSelectModel<T>[]): void {
  }

  abstract setDisabledState(isDisabled: boolean): void;

  writeValue(obj: NgxSelectModel<T>[]): void {
  }


}
