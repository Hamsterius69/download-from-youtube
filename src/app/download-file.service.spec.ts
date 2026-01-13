import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DownloadFileService } from './download-file.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DownloadFileService', () => {
  let service: DownloadFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(DownloadFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
