import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSelectModule } from '@w11k/ngx-select';
import { NgxSelectCustomIntlService } from './ngx-select-custom-intl.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSelectModule.forRoot({intlService: NgxSelectCustomIntlService}),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
