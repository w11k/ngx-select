import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSelectMaterialComponent } from './ngx-select-material/ngx-select-material.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSelectMaterialOverlayComponent } from './ngx-select-material/overlay/ngx-select-material-overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { DefaultNgxSelectIntlService, NGX_SELECT_INTL_SERVICE, NgxSelectConfig } from './core/ngx-select-intl.service';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    OverlayModule,
    ReactiveFormsModule,
  ],
  declarations: [NgxSelectMaterialComponent, NgxSelectMaterialOverlayComponent],
  exports: [NgxSelectMaterialComponent],
  entryComponents: [NgxSelectMaterialOverlayComponent],
})
export class NgxSelectModule {
  static forRoot(config?: NgxSelectConfig): ModuleWithProviders {
    return {
      ngModule: NgxSelectModule,
      providers: [
        { provide: NGX_SELECT_INTL_SERVICE, useClass: config && config.intlService || DefaultNgxSelectIntlService }
      ]
    };
  }
}
