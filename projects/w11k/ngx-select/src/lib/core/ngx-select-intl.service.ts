import { Injectable, InjectionToken, Type } from '@angular/core';

export interface NgxSelectIntlService {
  allNoneSelect: string;
  filterPlaceholder: string;
  searchFieldPlaceholder: string;
  selected: string;
  calculatePlaceHolder(selectedLabels: string[]): string;
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

  calculatePlaceHolder(selectedLabels: string[]) {
    if (selectedLabels.length === 0) {
      return this.searchFieldPlaceholder;
    } else if (selectedLabels.length <= 3) {
      return `${selectedLabels.join(', ')} ${this.selected}`;
    } else {
      return `${selectedLabels.length} ${this.selected}`;
    }
  }
}
