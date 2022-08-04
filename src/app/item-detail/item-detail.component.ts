import { Component, OnInit } from '@angular/core';
import { DownloadFileService } from '../download-file.service';
import { Observable } from 'rxjs';
import { detail } from './detail.model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  detail: any
  detail$: Observable<any>;

  constructor(public downloadFileService :DownloadFileService) {
    this.detail$ = this.downloadFileService.getDetail$();
  }

  ngOnInit(): void {
    this.detail$ = this.downloadFileService.getDetail$();
    this.detail$.subscribe(detail => this.detail = detail);
  }

}
