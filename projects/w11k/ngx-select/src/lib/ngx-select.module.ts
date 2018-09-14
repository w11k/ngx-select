import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSelectMaterialComponent } from './ngx-select-material/ngx-select-material.component';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectMaterialOverlayComponent } from './ngx-select-material/overlay/ngx-select-material-overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [NgxSelectMaterialComponent, NgxSelectMaterialOverlayComponent],
  exports: [NgxSelectMaterialComponent],
  entryComponents: [NgxSelectMaterialOverlayComponent],
})
export class NgxSelectModule {
}
