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
  private detailStatus$ = new Subject<detail>();
  private isLoading$ = new Subject<boolean>();
  private isLoadingStatus$ = new Subject<boolean>();
  private isReady$ = new Subject<boolean>();
  item: SearchData;
  itemData: StatusProcess;
  guidId: string;

  constructor(private http:HttpClient) {
    this.item = new SearchData('', '');
    this.itemData = new StatusProcess('');
    this.guidId = '';
  }

  statusProcess(): void {
    this.isLoadingStatus$.next(true);
    const headers = {
      'X-RapidAPI-Key': '59fe1defa6msh9e272bf9f215112p1e2fcajsn2c3687b8684a',
      'X-RapidAPI-Host': 't-one-youtube-converter.p.rapidapi.com'
    }
    const params = {
      guid: this.guidId,
      responseFormat: this.itemData.responseFormat,
      lang: this.itemData.lang
    }
    this.http.get<any>(this.itemData.urlBase, { headers, params }).subscribe({
      next: data => {
        if (data.status === 'complete') {
          this.isReady$.next(true);
          this.detailStatus$.next(data);
        } else {
          this.isReady$.next(false);
          window.alert("It's not ready, try again");
        }
        this.isLoadingStatus$.next(false);
      },
      error: error => {
        if(error.error && error.error.message) {
          console.error('There was an error!', error.error.message);
          window.alert(error.error.message);
        } else if (error.message) {
          console.error('There was an error!', error.message);
          window.alert(error.message);
        } else {
          console.error('There was an error!', error);
          window.alert(error);
        }
        this.isReady$.next(false);
        this.isLoadingStatus$.next(false);
      }
    });
  }

  createProcess(searchData: SearchData) :void {
    this.resetData();
    this.isLoading$.next(true);
    this.item = JSON.parse(JSON.stringify(searchData));
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
        console.log(data);
        data.format = params.format;
        this.guidId = data.guid;
        this.detail$.next(data);
        this.isLoading$.next(false);
      },
      error: error => {
        if(error.error && error.error.message) {
          console.error('There was an error!', error.error.message);
          window.alert(error.error.message);
        } else if (error.message) {
          console.error('There was an error!', error.message);
          window.alert(error.message);
        } else {
          console.error('There was an error!', error);
          window.alert(error.message);
        }
        this.isLoading$.next(false);
      }
    });
  }

  resetData(): void {
    this.isReady$.next(false);
    this.isLoading$.next(false);
    this.isLoadingStatus$.next(false);
    /*
    let auxYoutube = {
      id: '',
      definizione: '',
      descrizione: '',
      titolo: '',
      thumbUrl: '',
      licenza: '',
      durata_video: '',
      duration_original: '',
      urlMp3: '',
      urlVideo: '',
    }
    let auxDetail = {
      status: '',
      file: '',
      total_percentage: 0,
      YoutubeAPI: auxYoutube,
    }
    */
    // this.detail$.next(auxDetail);
    // this.detailStatus$.next(auxDetail);
  }

  getDetail$(): Observable<detail> {
    return this.detail$.asObservable();
  }

  getIsLoading$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  getIsLoadingStatus$(): Observable<boolean> {
    return this.isLoadingStatus$.asObservable();
  }

  getDetailStatus$(): Observable<detail> {
    return this.detailStatus$.asObservable();
  }

  getIsReady$(): Observable<boolean> {
    return this.isReady$.asObservable();
  }
}
