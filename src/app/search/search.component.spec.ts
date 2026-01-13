import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SearchComponent } from './search.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let notificationService: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [SearchComponent],
    imports: [FormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting(), NotificationService]
})
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('press button without URL', () => {
    spyOn(notificationService, 'warning');
    const btn = fixture.debugElement.query(By.css('.custom-btn'));
    btn.nativeElement.click();
    expect(notificationService.warning).toHaveBeenCalledWith('You must add a URL');
  });
});
