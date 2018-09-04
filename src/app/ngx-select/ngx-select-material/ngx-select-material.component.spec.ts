import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectMaterialComponent } from './ngx-select-material.component';
import { MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
        FormsModule,
        ReactiveFormsModule,
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
