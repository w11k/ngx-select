import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectMaterialOverlayComponent } from './ngx-select-material-overlay.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
      declarations: [NgxSelectMaterialOverlayComponent ]
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
