import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProductsComponent } from './components/products/products.component';
import { CurrencyValuePipe } from './pipes/currencyValue/currency-value.pipe';
import { LoginComponent } from './components/login/login.component';
import { HighLighterDirective } from './directives/appHighLighter/high-lighter.directive';
import { ArrayIteratorComponent } from './components/home/components/array-iterator/array-iterator.component';
import { ButtonComponentComponent } from './components/products/components/button-component/button-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkshopsComponent } from './components/workshops/workshops.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { RegisteredIdeasComponent } from './components/registered-ideas/registered-ideas.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactUsComponent,
    ProductsComponent,
    CurrencyValuePipe,
    LoginComponent,
    HighLighterDirective,
    ArrayIteratorComponent,
    ButtonComponentComponent,
    WorkshopsComponent,
    FaqsComponent,
    RegisteredIdeasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // MatInputModule,
    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    NgbModule,
    HttpClientModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ModalModule.forRoot(),
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
