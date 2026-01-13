import { Injectable } from '@angular/core';
import { SearchData, StatusProcess } from './search/searchData.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { detail } from './item-detail/detail.model';
import { HttpClient } from "@angular/common/http";
import { environment } from '../environments/environment';
import { extractVideoId } from './utils/url-parser.util';
import { formatDuration } from './utils/time-formatter.util';
import { NotificationService } from './services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  private detail$ = new BehaviorSubject<detail | null>(null);
  private detailStatus$ = new BehaviorSubject<detail | null>(null);
  private isLoading$ = new BehaviorSubject<boolean>(false);
  private isLoadingStatus$ = new BehaviorSubject<boolean>(false);
  private isReady$ = new BehaviorSubject<boolean>(false);
  item: SearchData;
  itemData: StatusProcess;
  guidId: string;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
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
    const videoId = extractVideoId(this.item.url);
    if (!videoId) {
      this.notificationService.error('Invalid YouTube URL. Please provide a valid YouTube video URL.');
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
          this.notificationService.error('Error: ' + data.errorId);
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
            durata_video: formatDuration(data.lengthSeconds),
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
        // Don't mark as ready yet - user needs to click "Prepare download" first
        this.isLoading$.next(false);
      },
      error: error => {
        if (error.message) {
          console.error('There was an error!', error.message);
          this.notificationService.error(error.message);
        } else {
          console.error('There was an error!', error);
          this.notificationService.error('An error occurred while fetching video details.');
        }
        this.isLoading$.next(false);
      }
    });
  }

  resetData(): void {
    this.isReady$.next(false);
    this.isLoading$.next(false);
    this.isLoadingStatus$.next(false);
  }

  getDetail$(): Observable<detail | null> {
    return this.detail$.asObservable();
  }

  getIsLoading$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  getIsLoadingStatus$(): Observable<boolean> {
    return this.isLoadingStatus$.asObservable();
  }

  getDetailStatus$(): Observable<detail | null> {
    return this.detailStatus$.asObservable();
  }

  getIsReady$(): Observable<boolean> {
    return this.isReady$.asObservable();
  }
}
