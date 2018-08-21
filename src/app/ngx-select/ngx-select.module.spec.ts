import { NgxSelectModule } from './ngx-select.module';

describe('NgxSelectModule', () => {
  let ngxSelectModule: NgxSelectModule;

  beforeEach(() => {
    ngxSelectModule = new NgxSelectModule();
  });

  it('should create an instance', () => {
    expect(ngxSelectModule).toBeTruthy();
  });
});
