export class SearchData {
  url: string;
  type: string;
  responseFormat: string;
  lang: string;
  urlBase: string;
  constructor(url:string, type:string) {
    this.url = url;
    this.type = type;
    this.responseFormat = 'json';
    this.lang = 'en';
    this.urlBase = 'https://t-one-youtube-converter.p.rapidapi.com/api/v1/createProcess';
  }
}

export class StatusProcess {
  guid: string;
  responseFormat: string;
  lang: string;
  urlBase: string;
  constructor(guid:string) {
    this.guid = guid;
    this.responseFormat = 'json';
    this.lang = 'en';
    this.urlBase = 'https://t-one-youtube-converter.p.rapidapi.com/api/v1/statusProcess';
  }
}
