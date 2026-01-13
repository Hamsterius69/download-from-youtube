import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SearchData } from './searchData.model';
import { DownloadFileService } from '../download-file.service';
import { NotificationService } from '../services/notification.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css', '../app.component.css'],
    standalone: false
})
export class SearchComponent implements OnInit {

  searchData: SearchData;
  isLoading: boolean
  isLoading$: Observable<boolean>;
  isDropdownOpen: boolean = false;
  selectedOption: { value: string, label: string } = { value: 'video', label: 'video' };
  options = [
    { value: 'video', label: 'video' },
    { value: 'mp3', label: 'mp3' }
  ];

  constructor(
    private downloadFileService: DownloadFileService,
    private notificationService: NotificationService
  ) {
    this.searchData = new SearchData('', 'video');
    this.isLoading = false;
    this.isLoading$ = this.downloadFileService.getIsLoading$();
  }

  updateURL(): void {
    if (this.searchData.url) {
      this.downloadFileService.createProcess(this.searchData);
    } else {
      this.notificationService.warning('You must add a URL');
    }
  }

  toggleDropdown(): void {
    if (!this.isLoading) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }

  selectOption(option: { value: string, label: string }): void {
    this.selectedOption = option;
    this.searchData.type = option.value;
    this.isDropdownOpen = false;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  ngOnInit(): void {
    this.isLoading$ = this.downloadFileService.getIsLoading$();
    this.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
  }
}
