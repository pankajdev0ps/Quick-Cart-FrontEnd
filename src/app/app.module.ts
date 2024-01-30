import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from 'src/app/home/home.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatRadioModule } from '@angular/material/radio';
import { ApplicationinsightsAngularpluginErrorService } from '@microsoft/applicationinsights-angularplugin-js';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,MatRadioModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    HomeModule, NgbModule,FormsModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ApplicationinsightsAngularpluginErrorService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
