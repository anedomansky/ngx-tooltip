import { TestBed } from '@angular/core/testing';

import { IdHelperService } from './id-helper.service';

describe('IdHelperService', () => {
  let service: IdHelperService;
  const testComponentName = 'ngx-test';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct id', () => {
    expect(service.getDefaultId(testComponentName)).toBe('ngx-test-0');
  });

  it('should correctly increment ids', () => {
    expect(service.getDefaultId(testComponentName)).toBe('ngx-test-0');
    expect(service.getDefaultId(testComponentName)).toBe('ngx-test-1');
  });
});
