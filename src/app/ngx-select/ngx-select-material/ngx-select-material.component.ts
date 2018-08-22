import { Component, Input, OnInit } from '@angular/core';
import { NgxSelect } from '../core/ngx-select.core';
import { NgxSelectModel } from '../core/ngx-select.model';

@Component({
  selector: 'ngx-select',
  templateUrl: './ngx-select-material.component.html',
  styleUrls: ['./ngx-select-material.component.scss']
})
export class NgxSelectMaterialComponent<T> extends NgxSelect<T> implements OnInit {

  @Input() selectOptions: NgxSelectModel<T>[] = [];

  constructor() {
    super();
  }

  ngOnInit() {
    this.setHidden(false);
  }

}
