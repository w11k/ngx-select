import { Component } from '@angular/core';
import { NGX_SELECT_MOCK } from './mock.model';
import { NgxSelectModel } from '@w11k/ngx-select';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mockData = NGX_SELECT_MOCK;

  formControl: FormControl;

  constructor() {
    this.formControl = new FormControl();
    this.formControl.valueChanges.subscribe(data => {
      console.log(data);
    });
  }

  logChangedOptions(changedOptions: NgxSelectModel<string>[]) {
    console.log(changedOptions);
  }
}
