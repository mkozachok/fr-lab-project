import { Component } from '@angular/core';
import { ProfilePageService } from './profile-page/profile-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ProfilePageService]
})
export class AppComponent {
  title = 'app';
}
