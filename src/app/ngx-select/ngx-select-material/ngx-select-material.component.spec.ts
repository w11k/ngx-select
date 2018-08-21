import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectMaterialComponent } from './ngx-select-material.component';

describe('NgxSelectMaterialComponent', () => {
  let component: NgxSelectMaterialComponent;
  let fixture: ComponentFixture<NgxSelectMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSelectMaterialComponent ]
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
