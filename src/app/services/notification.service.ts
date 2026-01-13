import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification$ = new BehaviorSubject<Notification | null>(null);

  constructor() { }

  getNotification$(): Observable<Notification | null> {
    return this.notification$.asObservable();
  }

  success(message: string, duration: number = 3000): void {
    this.show({ message, type: 'success', duration });
  }

  error(message: string, duration: number = 5000): void {
    this.show({ message, type: 'error', duration });
  }

  info(message: string, duration: number = 3000): void {
    this.show({ message, type: 'info', duration });
  }

  warning(message: string, duration: number = 4000): void {
    this.show({ message, type: 'warning', duration });
  }

  private show(notification: Notification): void {
    this.notification$.next(notification);

    // Auto-hide after duration
    if (notification.duration) {
      setTimeout(() => {
        this.hide();
      }, notification.duration);
    }
  }

  hide(): void {
    this.notification$.next(null);
  }
}
