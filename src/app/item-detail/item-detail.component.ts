import { Component, OnInit } from '@angular/core';
import { DownloadFileService } from '../download-file.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  detail: any;
  detail$: Observable<any>;
  isLoading: boolean;
  isLoading$: Observable<boolean>;

  constructor(public downloadFileService :DownloadFileService) {
    this.detail$ = this.downloadFileService.getDetail$();
    this.isLoading = false;
    this.isLoading$ = this.downloadFileService.getIsLoading$();
  }

  ngOnInit(): void {
    this.detail$ = this.downloadFileService.getDetail$();
    this.detail$.subscribe(detail => this.detail = detail);
    this.isLoading$ = this.downloadFileService.getIsLoading$();
    this.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
  }

  download(): void {
    console.log('descargando ...');
  }

}
