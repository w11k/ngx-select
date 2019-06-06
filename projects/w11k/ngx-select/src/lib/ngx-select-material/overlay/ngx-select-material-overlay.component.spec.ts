import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectMaterialOverlayComponent } from './ngx-select-material-overlay.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultNgxSelectIntlService, NGX_SELECT_INTL_SERVICE } from '../../core/ngx-select-intl.service';

describe('NgxSelectMaterialOverlayComponent', () => {
  let component: NgxSelectMaterialOverlayComponent<string>;
  let fixture: ComponentFixture<NgxSelectMaterialOverlayComponent<string>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [NgxSelectMaterialOverlayComponent ],
      providers: [
        { provide: NGX_SELECT_INTL_SERVICE, useClass: DefaultNgxSelectIntlService }
      ],
    })
    .compileComponents();
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
