import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { NgxSelectModel } from '../../core/ngx-select.model';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { NGX_SELECT_INTL_SERVICE, NgxSelectIntlService } from '../../core/ngx-select-intl.service';

@Component({
  selector: 'ngx-select-overlay',
  templateUrl: './ngx-select-material-overlay.component.html',
  styleUrls: ['./ngx-select-material-overlay.component.scss']
})
export class NgxSelectMaterialOverlayComponent<T> {

  @Output() resetFilter: EventEmitter<void> = new EventEmitter();
  @Output() toggleSelected: EventEmitter<void> = new EventEmitter();
  @Input() options$: Observable<NgxSelectModel<T>[]> = of([]);
  @Input() isDisabled = false;

  filterControl: UntypedFormControl = new UntypedFormControl('');
  checkboxGroup: UntypedFormGroup = new UntypedFormGroup({});

  constructor(@Inject(NGX_SELECT_INTL_SERVICE) private intlService: NgxSelectIntlService) {
  }


  localResetFilter() {
    this.filterControl.reset('');
    this.resetFilter.emit();
  }

  getAllNoneSelectLabel(): string {
    return this.intlService.allNoneSelect;
  }

  getFilterPlaceHolder(): string {
    return this.intlService.filterPlaceholder;
  }
}
