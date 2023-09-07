import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationListComponent } from './registration-list/registration-list.component';

const routes: Routes = [
    {path: '', component: RegistrationListComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RegistrationListRoutingModule { }