import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { WorkshopsComponent } from './components/workshops/workshops.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { LoginComponent } from './components/login/login.component';
import { RegisteredIdeasComponent } from './components/registered-ideas/registered-ideas.component';

// import { CanActivateService as CanActivateGaurd } from './common/services/authgaurd/can-activate.service'
// import { CanLoadService as CanLoadGaurd } from './common/services/authgaurd/can-load.service'



const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'genesysindiainnovation', component: HomeComponent,
  },
  { path: 'products', component: ProductsComponent },
  { path: 'contactUs', component: ContactUsComponent },
  { path: 'videos', component: WorkshopsComponent },
  { path: 'faq', component: FaqsComponent },
  {
    path: 'usersList',
    loadChildren: () => import('./registration-list/registration-list.module').then(m => m.RegistrationListModule)
  },
  {
    path: 'registrationForm',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'registeredIdeas',
    component: RegisteredIdeasComponent
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
