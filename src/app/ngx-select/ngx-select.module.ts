import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSelectMaterialComponent } from './ngx-select-material/ngx-select-material.component';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [NgxSelectMaterialComponent],
  exports: [NgxSelectMaterialComponent],
})
export class NgxSelectModule {
}
