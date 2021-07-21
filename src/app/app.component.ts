import { Component, HostListener, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pwa-poc-app';
  promptEvent: any;
  showButton = false;

  @HostListener('window:beforeinstallprompt', ['$event'])
onbeforeinstallprompt(e) {
  console.log(e);
  console.log('event found')
  this.promptEvent = e;
  this.showButton = true;
}

  constructor(private swUpdate: SwUpdate,  private _platform: Platform) {
    swUpdate.available.subscribe(event => {
        window.location.reload();
    });
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }

  ngOnInit() {
  }

  installPwa(): void {
    if (this._platform.isBrowser || this._platform.FIREFOX || this._platform.EDGE || this._platform.ANDROID) {
      this.promptEvent?.prompt();
    }
    if (this._platform.IOS) {
      alert('Add the site to home screen share -> Add to home screen')
    }
  }
}
