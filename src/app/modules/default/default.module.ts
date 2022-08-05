import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FaqComponent } from './components/faq/faq.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { SummerschoolComponent } from './components/summerschool/summerschool.component';


@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    PricingComponent,
    FaqComponent,
    NewsletterComponent,
    SummerschoolComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    SharedModule
  ]
})
export class DefaultModule { }
