import { IgxButton, IgxCardModule, IgxIconModule, IgxRippleModule, IgxButtonModule, IgxLabelModule } from 'igniteui-js-blocks/main';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FacebookService } from './services/fb.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IgxButtonModule,
    IgxCardModule,
    IgxIconModule,
    IgxRippleModule,
    IgxLabelModule
  ],
  providers: [FacebookService],
  bootstrap: [AppComponent],
})
export class AppModule { }
