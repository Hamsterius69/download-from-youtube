import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DownloadFileService } from './download-file.service';
import { SearchComponent } from './search/search.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ItemDetailComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [DownloadFileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
