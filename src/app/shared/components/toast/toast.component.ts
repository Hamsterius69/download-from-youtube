import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../../../services/notification.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css'],
    standalone: false
})
export class ToastComponent implements OnInit {
  notification$: Observable<Notification | null>;

  constructor(private notificationService: NotificationService) {
    this.notification$ = this.notificationService.getNotification$();
  }

  ngOnInit(): void {
  }

  close(): void {
    this.notificationService.hide();
  }
}
