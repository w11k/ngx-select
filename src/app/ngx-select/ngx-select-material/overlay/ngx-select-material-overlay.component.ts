import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSelectModel } from '../../core/ngx-select.model';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ngx-select-overlay',
  templateUrl: './ngx-select-material-overlay.component.html',
  styleUrls: ['./ngx-select-material-overlay.component.scss']
})
export class NgxSelectMaterialOverlayComponent<T> implements OnInit {

  @Output() resetFilter: EventEmitter<void> = new EventEmitter();
  @Output() toggleSelected: EventEmitter<void> = new EventEmitter();
  @Output() changeCheckbox: EventEmitter<NgxSelectModel<T>> = new EventEmitter();
  @Input() options$: Observable<NgxSelectModel<T>[]> = of([]);

  filterControl: FormControl = new FormControl('');

  constructor() { }

  ngOnInit() {
  }

  localResetFilter() {
    this.filterControl.reset();
    this.resetFilter.emit();
  }

}
