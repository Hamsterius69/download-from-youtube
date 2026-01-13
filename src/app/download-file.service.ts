import { Injectable } from '@angular/core';
import { SearchData, StatusProcess } from './search/searchData.model';
import { Observable, Subject, map} from 'rxjs';
import { detail } from './item-detail/detail.model';
import { HttpClient } from "@angular/common/http";
import { environment } from '../environments/environment';
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
    // With the new API, the download URL is already available from the first call
    // So we just mark it as ready
    this.isLoadingStatus$.next(true);
    this.isReady$.next(true);
    this.isLoadingStatus$.next(false);
  }

  createProcess(searchData: SearchData) :void {
    this.resetData();
    this.isLoading$.next(true);
    this.item = JSON.parse(JSON.stringify(searchData))

    // Extract video ID from YouTube URL
    const videoId = this.extractVideoId(this.item.url);
    if (!videoId) {
      window.alert('Invalid YouTube URL. Please provide a valid YouTube video URL.');
      this.isLoading$.next(false);
      return;
    }

    const params = {
      videoId: videoId
    }
    const headers = {
      'x-rapidapi-key': environment.rapidapi.key,
      'x-rapidapi-host': environment.rapidapi.host
    }
    this.http.get<any>(this.item.urlBase, { headers, params }).subscribe({
      next: data => {
        if (data.errorId !== 'Success') {
          console.error('API Error:', data.errorId);
          window.alert('Error: ' + data.errorId);
          this.isLoading$.next(false);
          return;
        }

        // Transform the new API response to match our existing structure
        const transformedData = {
          guid: data.id,
          status: 'complete',
          format: this.item.type,
          total_percentage: 100,
          YoutubeAPI: {
            id: data.id,
            titolo: data.title,
            descrizione: data.description || '',
            thumbUrl: data.thumbnails && data.thumbnails.length > 0
              ? data.thumbnails[data.thumbnails.length - 1].url
              : '',
            durata_video: this.formatDuration(data.lengthSeconds),
            duration_original: data.lengthSeconds,
            definizione: '',
            licenza: '',
            urlMp3: this.item.type === 'mp3' && data.audios?.items?.length > 0
              ? data.audios.items[0].url
              : '',
            urlVideo: this.item.type === 'video' && data.videos?.items?.length > 0
              ? data.videos.items[0].url
              : ''
          },
          // Store download URL directly
          file: this.item.type === 'mp3' && data.audios?.items?.length > 0
            ? data.audios.items[0].url
            : this.item.type === 'video' && data.videos?.items?.length > 0
            ? data.videos.items[0].url
            : ''
        };

        this.guidId = data.id;
        this.detail$.next(transformedData);
        this.detailStatus$.next(transformedData);
        this.isLoading$.next(false);
      },
      error: error => {
        if (error.message) {
          console.error('There was an error!', error.message);
          window.alert(error.message);
        } else {
          console.error('There was an error!', error);
          window.alert('An error occurred while fetching video details.');
        }
        this.isLoading$.next(false);
      }
    });
  }

  private extractVideoId(url: string): string | null {
    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  }

  private formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
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
