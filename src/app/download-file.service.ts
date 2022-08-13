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
    let data = {
      "status": "complete",
      "message": "file ready for download",
      "file": "https:\/\/www.youtube.film\/Downloads\/7\/8\/7\/d\/a\/6\/8\/5\/7\/d\/e\/8\/f\/e\/5\/1\/6\/e\/a\/b\/0\/7\/1\/d\/f\/1\/5\/6\/8\/3\/e\/e\/Grupo_Extra_-_Me_Emborrachare_con_Ataca_Alemana_Daniel_y_Desiree.mp3",
      "total_percentage": 100,
      "YoutubeAPI": {
        "id": "cm5j4Zbvqag",
        "definizione": "HD",
        "contatore_visualizzazioni": "210.957.140",
        "descrizione": "Learn to dance Bachata at http:\/\/IslandTouchOnline.com<br \/>\n<br \/>\nDaniel y Desiree, Ataca y La Alemana bailando en el Festival Tampa Salsa Bachata Festival.<br \/>\n<br \/>\nBACHATA 2017 <br \/>\nGRUPO EXTRA \u25ba ME EMBORRACHARE \u25ba FEAT. Ataca, Alemana, Daniel y Desiree<br \/>\n<br \/>\nDOWNLOAD \u25ba https:\/\/itunes.apple.com\/us\/album\/me-emborrachare-live-single\/id1146527304<br \/>\n<br \/>\nLearn to dance Bachata at http:\/\/IslandTouchOnline.com<br \/>\n<br \/>\nATACA x Fuego dance sneaker: https:\/\/fuegoshoes.com\/pages\/ataca",
        "titolo": "Grupo Extra - Me Emborrachare con Ataca, Alemana, Daniel y Desiree",
        "data_pubblicazione": "04\/10\/2016 00:09:09",
        "thumbUrl": "https:\/\/i.ytimg.com\/vi\/cm5j4Zbvqag\/default.jpg",
        "licenza": "NO",
        "durata_video": "4 minutes 2 seconds",
        "duration_original": "PT4M2S",
        "counter": 1,
        "paesi": null,
        "urlMp3": "https:\/\/www.youtube.film\/Downloads\/7\/8\/7\/d\/a\/6\/8\/5\/7\/d\/e\/8\/f\/e\/5\/1\/6\/e\/a\/b\/0\/7\/1\/d\/f\/1\/5\/6\/8\/3\/e\/e\/Grupo_Extra_-_Me_Emborrachare_con_Ataca_Alemana_Daniel_y_Desiree.mp3",
        "urlVideo": "https:\/\/www.youtube.film\/Downloads\/a\/f\/b\/8\/7\/2\/b\/b\/d\/c\/9\/a\/3\/b\/9\/5\/0\/f\/f\/2\/7\/5\/9\/3\/8\/d\/8\/5\/d\/4\/4\/e\/Grupo_Extra_-_Me_Emborrachare_con_Ataca_Alemana_Daniel_y_Desiree.webm"
      }
    }
    this.isReady$.next(true);
    this.detailStatus$.next(data);
    console.log(data);
    this.isLoadingStatus$.next(false);
    /*
    this.isReady$.next(true);
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
        console.log(data);
        if (data.status === 'complete') {
          this.isReady$.next(true);
          this.detailStatus$.next(data);
        } else {
          this.isReady$.next(false);
          console.log('aun no esta listo, trata de nuevo');
        }
        this.isLoadingStatus$.next(false);
      },
      error: error => {
        if (error.message) {
          console.error('There was an error!', error.message);
        } else {
          console.error('There was an error!', error);
        }
        this.isReady$.next(false);
        this.isLoadingStatus$.next(false);
      }
    });
    */
  }

  createProcess(searchData: SearchData) :void {
    let data = {
      "status": "",
      "guid": "787da6857de8fe516eab071df15683ee",
      "message": "already downloaded",
      "file": "https:\/\/www.youtube.film\/Downloads\/7\/8\/7\/d\/a\/6\/8\/5\/7\/d\/e\/8\/f\/e\/5\/1\/6\/e\/a\/b\/0\/7\/1\/d\/f\/1\/5\/6\/8\/3\/e\/e\/Grupo_Extra_-_Me_Emborrachare_con_Ataca_Alemana_Daniel_y_Desiree.mp3",
      "total_percentage": 100,
      "YoutubeAPI": {
        "id": "cm5j4Zbvqag",
        "definizione": "HD",
        "contatore_visualizzazioni": "210.921.905",
        "descrizione": "Learn to dance Bachata at http:\/\/IslandTouchOnline.com<br \/>\n<br \/>\nDaniel y Desiree, Ataca y La Alemana bailando en el Festival Tampa Salsa Bachata Festival.<br \/>\n<br \/>\nBACHATA 2017 <br \/>\nGRUPO EXTRA \u25ba ME EMBORRACHARE \u25ba FEAT. Ataca, Alemana, Daniel y Desiree<br \/>\n<br \/>\nDOWNLOAD \u25ba https:\/\/itunes.apple.com\/us\/album\/me-emborrachare-live-single\/id1146527304<br \/>\n<br \/>\nLearn to dance Bachata at http:\/\/IslandTouchOnline.com<br \/>\n<br \/>\nATACA x Fuego dance sneaker: https:\/\/fuegoshoes.com\/pages\/ataca",
        "titolo": "Grupo Extra - Me Emborrachare con Ataca, Alemana, Daniel y Desiree",
        "data_pubblicazione": "04\/10\/2016 00:09:09",
        "thumbUrl": "https:\/\/i.ytimg.com\/vi\/cm5j4Zbvqag\/default.jpg",
        "licenza": "NO",
        "durata_video": "4 minutes 2 seconds",
        "duration_original": "PT4M2S",
        "counter": 1,
        "paesi": null,
        "urlMp3": "https:\/\/www.youtube.film\/Downloads\/7\/8\/7\/d\/a\/6\/8\/5\/7\/d\/e\/8\/f\/e\/5\/1\/6\/e\/a\/b\/0\/7\/1\/d\/f\/1\/5\/6\/8\/3\/e\/e\/Grupo_Extra_-_Me_Emborrachare_con_Ataca_Alemana_Daniel_y_Desiree.mp3",
        "urlVideo": "https:\/\/www.youtube.film\/Downloads\/a\/f\/b\/8\/7\/2\/b\/b\/d\/c\/9\/a\/3\/b\/9\/5\/0\/f\/f\/2\/7\/5\/9\/3\/8\/d\/8\/5\/d\/4\/4\/e\/Grupo_Extra_-_Me_Emborrachare_con_Ataca_Alemana_Daniel_y_Desiree.webm"
      }
    }
    this.guidId = data.guid;
    this.detail$.next(data);
    console.log(data);
    this.isLoading$.next(false);
    /*
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
          this.guidId = data.guid;
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
    });*/
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
