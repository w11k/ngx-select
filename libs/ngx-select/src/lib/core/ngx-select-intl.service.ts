import { Injectable, InjectionToken, Type } from '@angular/core';

export interface NgxSelectIntlService {
  allNoneSelect: string;
  filterPlaceholder: string;
  searchFieldPlaceholder: string;
  selected: string;
  allSelected: string;
  calculatePlaceHolder(selectedLabels: string[], totalAmountOfLabels: number, originalPlaceholder: string | undefined): string;
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
  allSelected = 'all';

  constructor() { }

  calculatePlaceHolder(selectedLabels: string[], totalAmountOfLabels: number, originalPlaceholder: string | undefined) {

    if (selectedLabels.length === 0) {
      return !!originalPlaceholder ? originalPlaceholder : this.searchFieldPlaceholder;
    } else if (selectedLabels.length <= 3) {
      return `${selectedLabels.join(', ')} ${this.selected}`;
    } else if (selectedLabels.length === totalAmountOfLabels) {
      return this.allSelected;
    } else {
      return `${selectedLabels.length} ${this.selected}`;
    }
  }
}
