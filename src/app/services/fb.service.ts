// tslint:disable-next-line:import-blacklist
import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';


declare var window: any;
declare var FB: any;

@Injectable()
export class FacebookService {
  events: any[];

  public ready = new BehaviorSubject<boolean>(false);

  constructor(private zone: NgZone) {
  }

  public loadSdk() {
    this.loadAsync(() => { });
  }


  public loadAsync(callback: () => void) {
    window.fbAsyncInit = () => this.zone.run(callback);
    // Load the Facebook SDK asynchronously
    const s = 'script';
    const id = 'facebook-jssdk';
    const fjs = document.getElementsByTagName(s)[0];
    // tslint:disable-next-line:curly
    if (document.getElementById(id)) return;

    const js = document.createElement(s);
    js.id = id;
    js.src = 'http://connect.facebook.net/en_US/all.js';
    fjs.parentNode.insertBefore(js, fjs);
  }

  public getEvents(): Promise<any> {
    return new Promise((resolve, reject) => {
      FB.init({
        appId: '2035994816674976',
        xfbml: true,
        status: true, // check login status
        cookie: true,
        version: 'v2.10'
      });

      FB.api(
        '/salsaparty.bg/events',
        'GET',
        {
          access_token: '2035994816674976|L6j3O6oqJdpYPm7icOS0UV25ZDc'
        },
        function (response) {
          resolve(response);
        }
      );
    });
  }
}
