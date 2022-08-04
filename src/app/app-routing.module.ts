import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { BrandComponent } from './components/brand/brand.component';
import { HomeComponent } from './components/home/home.component';
import { DefaultErrorComponent } from './components/default-error/default-error.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'product', component: ProductComponent},
  {path:'product-type', component: ProductTypeComponent},
  {path:'brand', component: BrandComponent},
  {path:'not-found', component: DefaultErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
