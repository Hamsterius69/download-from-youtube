import { Component, OnInit } from '@angular/core';
import { DownloadFileService } from '../download-file.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css', '../app.component.css']
})
export class ItemDetailComponent implements OnInit {
  detail: any;
  detailStatus: any;
  isLoading: boolean;
  isLoadingStatus: boolean;
  isReady: boolean;
  isLoading$: Observable<boolean>;
  isLoadingStatus$: Observable<boolean>;
  isReady$: Observable<boolean>;
  detail$: Observable<any>;
  detailStatus$: Observable<any>;

  constructor(public downloadFileService :DownloadFileService) {
    this.isLoading = false;
    this.isLoadingStatus = false;
    this.isReady = false;
    this.isLoading$ = this.downloadFileService.getIsLoading$();
    this.isLoadingStatus$ = this.downloadFileService.getIsLoadingStatus$();
    this.isReady$ = this.downloadFileService.getIsReady$();
    this.detail$ = this.downloadFileService.getDetail$();
    this.detailStatus$ = this.downloadFileService.getDetailStatus$();
  }

  ngOnInit(): void {
    // this.isLoading$ = this.downloadFileService.getIsLoading$();
    // this.isReady$ = this.downloadFileService.getIsReady$();
    // this.detail$ = this.downloadFileService.getDetail$();
    // this.detailStatus$ = this.downloadFileService.getDetailStatus$();
    this.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
    this.isLoadingStatus$.subscribe(isLoadingStatus => this.isLoadingStatus = isLoadingStatus);
    this.isReady$.subscribe(isReady => this.isReady = isReady);
    this.detail$.subscribe(detail => this.detail = detail);
    this.detailStatus$.subscribe(detailStatus => this.detailStatus = detailStatus);
  }

  download(): void {
    console.log('descargando ...');
  }

  prepareDownload() {
    this.downloadFileService.statusProcess();
  }

}
