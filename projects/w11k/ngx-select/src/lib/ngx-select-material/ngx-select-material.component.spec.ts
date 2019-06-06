import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectMaterialComponent } from './ngx-select-material.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { DefaultNgxSelectIntlService, NGX_SELECT_INTL_SERVICE } from '../core/ngx-select-intl.service';

describe('NgxSelectMaterialComponent', () => {
  let component: NgxSelectMaterialComponent<string>;
  let fixture: ComponentFixture<NgxSelectMaterialComponent<string>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSelectMaterialComponent ],
      imports: [
        NoopAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        OverlayModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: NGX_SELECT_INTL_SERVICE, useClass: DefaultNgxSelectIntlService }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSelectMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
