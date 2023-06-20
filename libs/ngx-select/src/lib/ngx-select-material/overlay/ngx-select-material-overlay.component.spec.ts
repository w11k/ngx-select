import { NgxSelectMaterialOverlayComponent } from './ngx-select-material-overlay.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DefaultNgxSelectIntlService, NGX_SELECT_INTL_SERVICE } from '../../core/ngx-select-intl.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NgxSelectMaterialOverlayComponent', () => {
  let component: NgxSelectMaterialOverlayComponent<string>;
  let fixture: ComponentFixture<NgxSelectMaterialOverlayComponent<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxSelectMaterialOverlayComponent,
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule
      ],
      providers: [
    { provide: NGX_SELECT_INTL_SERVICE, useClass: DefaultNgxSelectIntlService }
        ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSelectMaterialOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
