import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { MaterialComponent } from './material/material.component';
import { PurchaseComponent } from './purchase/purchase.component';

const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'furniture', component: FurnitureComponent },
  { path: 'manufacturers', component: ManufacturerComponent },
  { path: 'materials', component: MaterialComponent },
  { path: 'purchases', component: PurchaseComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
