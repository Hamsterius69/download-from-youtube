export interface detail {
  status: string;
  file: string;
  total_percentage: number;
  YoutubeAPI: youtubeData;
}

export interface youtubeData {
  id: string;
  definizione: string;
  descrizione: string;
  titolo: string;
  thumbUrl: string;
  licenza: string;
  durata_video: string;
  duration_original: string;
  urlMp3: any;
  urlVideo: any;
}
