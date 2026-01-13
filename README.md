# DownloadFromYoutube

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

A simple Angular application to download YouTube videos and audio (MP3) using the YouTube Media Downloader API from RapidAPI.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure API Key

This project uses the [YouTube Media Downloader API](https://rapidapi.com/DataFanatic/api/youtube-media-downloader) from RapidAPI.

1. Create a free account on [RapidAPI](https://rapidapi.com/)
2. Subscribe to the [YouTube Media Downloader API](https://rapidapi.com/DataFanatic/api/youtube-media-downloader) (free plan available)
3. Copy your API key
4. Create environment files from the examples:

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
```

5. Edit both files and replace `YOUR_RAPIDAPI_KEY_HERE` with your actual API key

**Note:** Never commit your actual API keys to the repository. The `environment.ts` and `environment.prod.ts` files are ignored by git.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
