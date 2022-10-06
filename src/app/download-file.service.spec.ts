import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DownloadFileService } from './download-file.service';

describe('DownloadFileService', () => {
  let service: DownloadFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DownloadFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
