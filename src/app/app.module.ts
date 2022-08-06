import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ProductComponent } from './components/product/product.component';
import { ProductTypeComponent } from './components/product-type/product-type.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BASE_URL } from './models/constants';
import { environment } from 'src/environments/environment';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { DefaultErrorComponent } from './components/default-error/default-error.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { OrderComponent } from './components/order/order.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { InfoBuyComponent } from './components/info-buy/info-buy.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ProductComponent,
    ProductTypeComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    DialogComponent,
    DefaultErrorComponent,
    OrderComponent,
    CarouselComponent,
    InfoBuyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    {provide: BASE_URL,useValue:(environment.baseUrl) || ''},
    {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor,multi:true},
    {provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
