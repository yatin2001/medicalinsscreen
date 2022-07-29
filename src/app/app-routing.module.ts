import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalComponent } from './medical/medical.component';

const routes: Routes = [
  {path:'medical',component:MedicalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
