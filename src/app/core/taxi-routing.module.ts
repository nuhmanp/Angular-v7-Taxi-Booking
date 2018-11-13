import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { BookTaxiComponent } from './book-taxi/book-taxi.component';
import { ViewTaxisComponent } from './view-taxis/view-taxis.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'view-taxis', component: ViewTaxisComponent },
      { path: 'book-taxi', component: BookTaxiComponent }
    ])
  ]
})
export class TaxiRoutingModule {}
