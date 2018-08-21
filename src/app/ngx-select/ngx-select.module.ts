import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSelectMaterialComponent } from './ngx-select-material/ngx-select-material.component';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  declarations: [NgxSelectMaterialComponent],
  exports: [NgxSelectMaterialComponent],
})
export class NgxSelectModule {
}
