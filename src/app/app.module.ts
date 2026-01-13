import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DownloadFileService } from './download-file.service';
import { SearchComponent } from './search/search.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@NgModule({ declarations: [
        AppComponent,
        SearchComponent,
        ItemDetailComponent,
        ToastComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule, FormsModule], providers: [DownloadFileService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
