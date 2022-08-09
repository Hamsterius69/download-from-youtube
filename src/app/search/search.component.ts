import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchData } from './searchData.model';
import { DownloadFileService } from '../download-file.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', '../app.component.css']
})
export class SearchComponent implements OnInit {

  searchData: SearchData;
  isLoading: boolean
  isLoading$: Observable<boolean>;

  constructor(private downloadFileService :DownloadFileService) {
    this.searchData = new SearchData('', 'video');
    this.isLoading = false;
    this.isLoading$ = this.downloadFileService.getIsLoading$();
  }

  updateURL(): void {
    if (this.searchData.url) {
      // this.newSearchData.emit(this.searchData);
      this.downloadFileService.createProcess(this.searchData);
    }
  }

  ngOnInit(): void {
    this.isLoading$ = this.downloadFileService.getIsLoading$();
    this.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
  }
}
