import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { AngularPlugin } from '@microsoft/applicationinsights-angularplugin-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'QuickKart-FrontEnd';
  constructor(private router: Router) {
    var angularPlugin = new AngularPlugin();
    const appInsights = new ApplicationInsights({
      config: {
        instrumentationKey: '7a3974c6-2311-4631-a01e-ba7080edf470',
        extensions: [angularPlugin],
        extensionConfig: {
          [angularPlugin.identifier]: { router: this.router },
        },
      },
    });
    appInsights.loadAppInsights();
  }
}
