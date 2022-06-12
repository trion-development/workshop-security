import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'trainings';

  demo: SafeHtml = this.sani.bypassSecurityTrustHtml('<script>console.log(\'xss\')</script>');

  constructor(private sani: DomSanitizer) {
  }

  sanitize(val: string) {
    this.demo = this.sani.bypassSecurityTrustHtml(val);
  }
}
