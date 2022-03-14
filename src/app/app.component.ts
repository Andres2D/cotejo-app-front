import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cotejo-app-ui';

  sendFeedback(): void {
    const link = `mailto:andres2d1997.1206@gmail.com?subject=files&body=Hey Andres, I just check the App and this is my feedback: `;
    window.location.href = link;
  }
}
