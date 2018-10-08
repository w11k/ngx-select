import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSelectModule } from '../../projects/w11k/ngx-select/src/lib/ngx-select.module';
import { NgxSelectCustomIntlService } from './ngx-select-custom-intl.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSelectModule.forRoot({intlService: NgxSelectCustomIntlService}),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
