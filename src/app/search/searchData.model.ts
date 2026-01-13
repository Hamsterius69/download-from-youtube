export class SearchData {
  url: string;
  type: string;
  urlBase: string;
  constructor(url:string, type:string) {
    this.url = url;
    this.type = type;
    this.urlBase = 'https://youtube-media-downloader.p.rapidapi.com/v2/video/details';
  }
}

export class StatusProcess {
  guid: string;
  urlBase: string;
  constructor(guid:string) {
    this.guid = guid;
    this.urlBase = 'https://youtube-media-downloader.p.rapidapi.com/v2/video/details';
  }
}
