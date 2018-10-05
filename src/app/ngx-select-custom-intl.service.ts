import { Injectable } from '@angular/core';
import { DefaultNgxSelectIntlService } from '../../projects/w11k/ngx-select/src/lib/core/ngx-select-intl.service';

@Injectable()
export class NgxSelectCustomIntlService extends DefaultNgxSelectIntlService {

  allNoneSelect = 'Alle / Keine';
  filterPlaceholder = 'Filter';
  searchFieldPlaceholder = 'Suche';
  selected = 'ausgewählt';

  constructor() {
    super();
  }
}
