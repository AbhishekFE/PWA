import { Component, HostListener, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Platform } from '@angular/cdk/platform';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';

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

  constructor(private swUpdate: SwUpdate,  private _platform: Platform, public dialog: MatDialog) {
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
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
