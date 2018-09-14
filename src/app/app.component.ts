import { Component } from '@angular/core';
import { NGX_SELECT_MOCK } from './mock.model';
import { NgxSelectModel } from '@w11k/ngx-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mockData = NGX_SELECT_MOCK;


  logChangedOptions(changedOptions: NgxSelectModel<string>[]) {
    console.log(changedOptions);
  }
}
