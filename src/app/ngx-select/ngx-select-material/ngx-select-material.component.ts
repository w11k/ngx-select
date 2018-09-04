import { Component, Input, OnInit } from '@angular/core';
import { NgxSelect } from '../core/ngx-select.core';
import { NgxSelectModel } from '../core/ngx-select.model';

@Component({
  selector: 'ngx-select',
  templateUrl: './ngx-select-material.component.html',
  styleUrls: ['./ngx-select-material.component.scss'],
})
export class NgxSelectMaterialComponent<T> extends NgxSelect<T> implements OnInit {

  @Input()
  set originalOptions(value: NgxSelectModel<T>[]) {
    super.setOriginalOptions(value);
  }


  constructor() {
    super();
  }

  ngOnInit() {
    this.setHidden(false);
  }
}
