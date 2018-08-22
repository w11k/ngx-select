import { Component } from '@angular/core';
import { NGX_SELECT_MOCK } from './ngx-select/mock.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mockData = NGX_SELECT_MOCK;
}
