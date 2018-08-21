import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSelectComponent } from './ngx-select.component';

describe('NgxSelectComponent', () => {
  let component: NgxSelectComponent;
  let fixture: ComponentFixture<NgxSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
