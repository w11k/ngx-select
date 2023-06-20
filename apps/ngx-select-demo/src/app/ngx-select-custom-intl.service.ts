import { Injectable } from '@angular/core';
import { DefaultNgxSelectIntlService } from '@w11k/ngx-select';

@Injectable()
export class NgxSelectCustomIntlService extends DefaultNgxSelectIntlService {

  override allNoneSelect = 'Alle / Keine';
  override filterPlaceholder = 'Filter';
  override searchFieldPlaceholder = 'Suche';
  override selected = 'ausgewählt';
  override allSelected = 'Alle ausgewählt';

  constructor() {
    super();
  }
}
