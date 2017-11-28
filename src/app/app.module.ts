import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StimulusComponent } from './stimulus/stimulus.component';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';

import {MatButtonModule, MatRadioModule, MatTableModule, MatToolbarModule} from '@angular/material';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    StimulusComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'stimulus',
        pathMatch: 'full'
      },
      {
        path: 'stimulus',
        component: StimulusComponent
      }

    ]),
    MatToolbarModule,
    MatTableModule,
    MatRadioModule,
    MatButtonModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
