import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NgxSelectModule } from '@w11k/ngx-select';
import { NgxSelectMaterialComponent, DefaultNgxSelectIntlService, NGX_SELECT_INTL_SERVICE } from '@w11k/ngx-select';

describe('AppComponent', () => {

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NgxSelectMaterialComponent
      ],
      providers: [{provide: NGX_SELECT_INTL_SERVICE, useValue: DefaultNgxSelectIntlService}],
      imports: [NgxSelectModule],
    }).compileComponents();
  }));
  it('should create the app', (() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
