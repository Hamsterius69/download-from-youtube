# DownloadFromYoutube

[![Angular](https://img.shields.io/badge/Angular-19-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](package.json)

A modern Angular application to download YouTube videos and audio (MP3) using the YouTube Media Downloader API from RapidAPI.

## Features

- 🎥 Download YouTube videos in various formats
- 🎵 Extract audio as MP3
- 🎨 Modern UI with TailwindCSS
- 🔔 Toast notifications system
- ⚡ Fast and responsive
- 🧪 Unit tested (100% passing)
- 🔒 Secure API key management

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

**Important:** The demo uses a free API plan limited to 100 downloads per month.

## Demo page
👉 https://download-from-youtube.pages.dev/

## Development

### Development server

Run `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Watch mode

Run `npm run watch` to build the project in watch mode with development configuration.

## Technology Stack

- **Angular**: 19.2.18
- **TypeScript**: 5.8.3
- **RxJS**: 7.5.0
- **TailwindCSS**: 3.1.7
- **Karma/Jasmine**: Unit testing framework

## Project Structure

```
src/
├── app/
│   ├── search/              # Search component with URL input
│   ├── item-detail/         # Video details display
│   ├── shared/
│   │   └── components/
│   │       └── toast/       # Toast notification component
│   ├── services/
│   │   └── notification.service.ts  # Notification management
│   ├── utils/
│   │   ├── url-parser.util.ts       # YouTube URL parsing
│   │   └── time-formatter.util.ts   # Duration formatting
│   └── download-file.service.ts     # API integration
└── environments/            # Environment configurations
```

## Changelog

### Version 2.0.0 (2026-01-13)

**Major Updates:**
- ⬆️ Upgraded from Angular 14 to Angular 19
- ⬆️ Upgraded TypeScript from 4.7 to 5.8
- 🔄 Migrated to modern HTTP providers system
- 🔔 Added toast notification system (replaced window.alert)
- 🧹 Removed unused dependencies (lodash)
- ♻️ Refactored to BehaviorSubject pattern
- 🛠️ Extracted utility functions for reusability
- ✅ Updated all unit tests (5/5 passing)
- 📝 Added MIT License
- 🎨 Improved UI with better user feedback

**Breaking Changes:**
- Components now explicitly marked as `standalone: false`
- HTTP module migrated to `provideHttpClient` pattern

## API Limitations

The free tier of YouTube Media Downloader API has the following limitations:
- 100 requests per month
- Rate limit may apply

Consider upgrading to a paid plan for production use.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Ariel Aguilar**

## Acknowledgments

- [Angular Team](https://angular.io/) for the amazing framework
- [RapidAPI](https://rapidapi.com/) for providing the YouTube Media Downloader API
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
