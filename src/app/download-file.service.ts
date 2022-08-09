import { Injectable } from '@angular/core';
import { SearchData, StatusProcess } from './search/searchData.model';
import { Observable, Subject, map} from 'rxjs';
import { detail } from './item-detail/detail.model';
import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  private detail$ = new Subject<detail>();
  private isLoading$ = new Subject<boolean>();
  item: SearchData;

  constructor(private http:HttpClient) {
    this.item = new SearchData('', '');
   }

  createProcess(searchData: SearchData) {
    this.isLoading$.next(true);
    this.item = JSON.parse(JSON.stringify(searchData))
    const params = {
      format: this.item.type,
      responseFormat: this.item.responseFormat,
      lang: this.item.lang,
      url: this.item.url
    }
    const headers = {
      'X-RapidAPI-Key': '59fe1defa6msh9e272bf9f215112p1e2fcajsn2c3687b8684a',
      'X-RapidAPI-Host': 't-one-youtube-converter.p.rapidapi.com'
    }
    this.http.get<any>(this.item.urlBase, { headers, params }).subscribe({
        next: data => {
            this.detail$.next(data);
            console.log(data);
            this.isLoading$.next(false);
        },
        error: error => {
          if (error.message) {
            console.error('There was an error!', error.message);
          } else {
            console.error('There was an error!', error);
          }
          this.isLoading$.next(false);
        }
    });
  }

  getDetail$(): Observable<detail> {
    return this.detail$.asObservable();
  }

  getIsLoading$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  statusProcess() {
    console.log('statusProcess');
  }
}
