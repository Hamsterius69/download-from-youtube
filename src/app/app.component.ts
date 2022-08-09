import { Component } from '@angular/core';
import { DownloadFileService } from './download-file.service';
import { SearchData } from './search/searchData.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor (private downloadFileService :DownloadFileService) {
  }

  searchURL(searchData: SearchData): void {
    this.downloadFileService.createProcess(searchData);
  }
}
