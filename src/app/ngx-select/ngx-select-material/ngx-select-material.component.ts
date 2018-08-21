import { Component, OnInit } from '@angular/core';
import { AbstractNgxSelect } from '../core/ngx-select.core';

@Component({
  selector: 'ngx-select',
  templateUrl: './ngx-select-material.component.html',
  styleUrls: ['./ngx-select-material.component.scss']
})
export class NgxSelectMaterialComponent extends AbstractNgxSelect implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
