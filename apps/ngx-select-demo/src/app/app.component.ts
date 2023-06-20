import { Component } from '@angular/core';
import { NGX_SELECT_MOCK } from './mock.model';
import { NgxSelectModel, NgxSelectToggleState } from '@w11k/ngx-select';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mockData = NGX_SELECT_MOCK;
  private _disable = false;
  formControl: UntypedFormControl;

  constructor() {
    this.formControl = new UntypedFormControl({
      'Label 1': true,
      'Label 2': false,
      'Label 3': true,
    });
    this.formControl.valueChanges.subscribe((data: NgxSelectModel<string>[]) => {
      console.log(data);
    });
  }

  logToggleState(toggleState: NgxSelectToggleState) {
    console.log(toggleState);
  }

  disable() {
    this._disable = !this._disable;
    if (this._disable) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }
}
