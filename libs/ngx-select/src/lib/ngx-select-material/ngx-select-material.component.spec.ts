
import { NgxSelectMaterialComponent } from './ngx-select-material.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { DefaultNgxSelectIntlService, NGX_SELECT_INTL_SERVICE } from '../core/ngx-select-intl.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';

describe('NgxSelectMaterialComponent', () => {
  let component: NgxSelectMaterialComponent<string>;
  let fixture: ComponentFixture<NgxSelectMaterialComponent<any>>;

  beforeEach(waitForAsync(() => {
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
        MatFormFieldModule
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
