import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchData } from './searchData.model';
import { DownloadFileService } from '../download-file.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  // @Output() newSearchData = new EventEmitter<SearchData>();

  searchData: SearchData;

  constructor(private downloadFileService :DownloadFileService) {
    this.searchData = new SearchData('', 'video');
  }

  updateURL(): void {
    if (this.searchData.url) {
      // this.newSearchData.emit(this.searchData);
      this.downloadFileService.createProcess(this.searchData);

    }
  }

  ngOnInit(): void {
  }

}
