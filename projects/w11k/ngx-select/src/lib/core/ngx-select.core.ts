import { NgxSelectModel, NgxSelectToggleState } from './ngx-select.model';
import { FormControl } from '@angular/forms';
import { EventEmitter, OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { NgxSelectIntlService } from './ngx-select-intl.service';

export abstract class NgxSelect<T> implements OnDestroy {
  private _originalOptions: NgxSelectModel<T>[] = [];
  private _internalOptionsCopy: NgxSelectModel<T>[] = [];
  private filterSubscription: Subscription;
  private lastFilterQuery = '';

  visibleOptions$: ReplaySubject<NgxSelectModel<T>[]> = new ReplaySubject(1);
  filterControl: FormControl = new FormControl('');
  visible = false;
  placeholder = '';
  changeToggleState: EventEmitter<NgxSelectToggleState> = new EventEmitter<NgxSelectToggleState>();
  changedOptions: EventEmitter<NgxSelectModel<T>[]> = new EventEmitter<NgxSelectModel<T>[]>();

  protected constructor(protected intlService: NgxSelectIntlService) {
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
    this.changedOptions.emit(this._internalOptionsCopy);
  }

  toggleAllNoneSelected() {
    if (this.isAllSelected(this._internalOptionsCopy)) {
      this.setInternalOptions(this._internalOptionsCopy.map(item => ({...item, selected: false})));
      this.changeToggleState.emit(NgxSelectToggleState.NONE);
    } else {
      this.setInternalOptions(this._internalOptionsCopy.map(item => ({...item, selected: true})));
      this.changeToggleState.emit(NgxSelectToggleState.ALL);
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
    this.placeholder = this.intlService.calculatePlaceHolder(value);
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
