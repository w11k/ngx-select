import { Injectable } from '@angular/core';
import { DefaultNgxSelectIntlService } from '@w11k/ngx-select';

@Injectable()
export class NgxSelectCustomIntlService extends DefaultNgxSelectIntlService {

  allNoneSelect = 'Alle / Keine';
  filterPlaceholder = 'Filter';
  searchFieldPlaceholder = 'Suche';
  selected = 'ausgewählt';
  allSelected = 'Alle ausgewählt';

  constructor() {
    super();
  }
}
