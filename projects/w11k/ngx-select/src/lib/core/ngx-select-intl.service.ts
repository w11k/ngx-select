import { Injectable, InjectionToken, Type } from '@angular/core';

export interface NgxSelectIntlService {
  allNoneSelect: string;
  filterPlaceholder: string;
  searchFieldPlaceholder: string;
  selected: string;
  calculatePlaceHolder(selectOptions: {label: string, selected?: boolean}[]): string;
}

export const NGX_SELECT_INTL_SERVICE = new InjectionToken<NgxSelectIntlService>('NGX_SELECT_INTL_SERVICE');

export interface NgxSelectConfig {
  intlService: Type<NgxSelectIntlService>;
}

@Injectable()
export class DefaultNgxSelectIntlService implements NgxSelectIntlService {

  allNoneSelect =  'all / none';
  filterPlaceholder = 'Filter';
  searchFieldPlaceholder = 'Search';
  selected = 'selected';

  constructor() { }

  calculatePlaceHolder(selectOptions: {label: string, selected?: boolean}[]) {
    const countSelectedItems = selectOptions.filter(item => item.selected).length;

    if (countSelectedItems === 0) {
      return this.searchFieldPlaceholder;
    } else if (countSelectedItems <= 3) {
      return `${selectOptions.filter(item => item.selected).map(item => item.label).join(', ')} ${this.selected}`;
    } else {
      return `${countSelectedItems} ${this.selected}`;
    }
  }
}
