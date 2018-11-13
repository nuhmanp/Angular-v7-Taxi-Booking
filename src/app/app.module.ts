import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookTaxiComponent } from './core/book-taxi/book-taxi.component';
import { ViewTaxisComponent } from './core/view-taxis/view-taxis.component';
import { WelcomeComponent } from './home/welcome.component';
import { MatSharedModule } from './shared/mat-shared.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ViewTaxisComponent,
    BookTaxiComponent
  ],
  imports: [BrowserModule, MatSharedModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
