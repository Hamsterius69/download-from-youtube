import { Injectable } from '@angular/core';
import { SearchData } from './search/searchData.model';
import { Observable, Subject} from 'rxjs';
import { detail } from './item-detail/detail.model';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  private detail$ = new Subject<detail>();
  item: SearchData;

  constructor() {
    this.item = new SearchData('', '');
   }

  createProcess(searchData: SearchData) {
    console.log('createProcess');
    console.log(searchData);
    this.item = JSON.parse(JSON.stringify(searchData))
  }

  getItem() {
    return this.item;
  }

  addDetail(detailItem: detail) {
    this.detail$.next(detailItem);
  }

  getDetail$(): Observable<detail> {
    return this.detail$.asObservable();
  }

  statusProcess() {
    console.log('statusProcess');
  }
}
