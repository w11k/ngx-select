import { NgxSelectModel, NgxSelectToggleState } from './ngx-select.model';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup } from '@angular/forms';
import { EventEmitter, OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { NgxSelectIntlService } from './ngx-select-intl.service';

export abstract class NgxSelect<T> implements OnDestroy, ControlValueAccessor {
  private _originalOptions: NgxSelectModel<T>[] = [];
  private filterSubscription: Subscription;
  private checkboxGroupSubscription: Subscription = new Subscription();
  private lastFilterQuery = '';

  visibleOptions$: ReplaySubject<NgxSelectModel<T>[]> = new ReplaySubject(1);
  filterControl: FormControl = new FormControl('');
  checkboxGroup: FormGroup = new FormGroup({});
  visible = false;
  placeholder: string | undefined = this.intlService.searchFieldPlaceholder;
  visiblePlaceholder = '';
  changeToggleState: EventEmitter<NgxSelectToggleState> = new EventEmitter<NgxSelectToggleState>();
  isDisabled = false;

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
    this.checkboxGroupSubscription.unsubscribe();
  }

  toggleVisibility(): void {
    this.visible = !this.visible;
  }

  toggleAllNoneSelected() {
    if (!this.isDisabled) {
      const formControlKeys = this._originalOptions.map(item => item.label);
      const selectedLenght = formControlKeys.filter(label => {
        const formControl: AbstractControl | null = this.checkboxGroup.controls[label];
        if (formControl === null) {
          return false;
        } else {
          return formControl.value === true;
        }
      }).length;

      if (this._originalOptions.length === selectedLenght) {
        const newValues: {[x: string]: boolean} = formControlKeys.map(label => ({[label]: false}))
          .reduce((prev, curr) => {
            return {
              ...prev,
              ...curr,
            };
          }, {});
        this.checkboxGroup.setValue( newValues);
        this.changeToggleState.emit(NgxSelectToggleState.NONE);
      } else {
        const newValues: {[x: string]: boolean} = formControlKeys.map(label => ({[label]: true}))
          .reduce((prev, curr) => {
            return {
              ...prev,
              ...curr,
            };
          }, {});
        this.checkboxGroup.setValue( newValues);
        this.changeToggleState.emit(NgxSelectToggleState.ALL);
      }
    }
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

  private calculateFormGroup(values: NgxSelectModel<T>[]) {
    const formControlsArr: {[label: string]: FormControl}[] = values.map(value => ({ [value.label]: new FormControl()}));
    const formControls: {[label: string]: FormControl} = formControlsArr.reduce((prev, curr) => {
      return {
        ...prev,
        ...curr,
      };
    }, {});
    this.checkboxGroup = new FormGroup(formControls);
    this.checkboxGroupSubscription.unsubscribe();
    this.checkboxGroupSubscription = this.checkboxGroup.valueChanges.subscribe(data => {
      const keys = Object.keys(data);
      const placeHolderKeys = keys.filter(key => data[key] !== null && data[key] === true);
      this.visiblePlaceholder = this.intlService.calculatePlaceHolder(placeHolderKeys, this.placeholder);
      this.propagateChange(data);
    });
  }

  setOriginalOptions(value: NgxSelectModel<T>[]) {
    this._originalOptions = value;
    this.setVisibleOptions(value);
    this.calculateFormGroup(value);
  }

  get originalOptions() {
    return this._originalOptions;
  }

  resetFilter() {
    this.filterControl.reset('');
  }


  propagateChange = (_: NgxSelectModel<T>[]) => {
  };

  registerOnChange(fn: (_: NgxSelectModel<T>[]) => any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: NgxSelectModel<T>[]): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (isDisabled) {
      this.checkboxGroup.disable();
    } else {
      this.checkboxGroup.enable();
    }
  }

  writeValue(obj: {[label: string]: boolean | null} | null | undefined): void {
    this.checkboxGroup.patchValue(obj || {});
  }


}
