import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BASE_URL } from '../models/constants';
import { ProductTypeDto } from '../models/productType';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  endpoint:string = ''

  constructor(private http: HttpClient, @Inject(BASE_URL) endpoint:string) {
    this.endpoint = endpoint;
  }

  getProductTypes():Observable<ProductTypeDto[]>{
    let apiUrl = `${this.endpoint}/api/ProductType`;
    return this.http.get<ProductTypeDto[]>(apiUrl);
  }

  getProductTypeById(code:string):Observable<ProductTypeDto>{
    let apiUrl = `${this.endpoint}/api/ProductType/${code}`;
    return this.http.get<ProductTypeDto>(apiUrl);
  }

  createProductType(data: any):Observable<any>{
    let result;
    let apiUrl = `${this.endpoint}/api/ProductType`;
    this.http.post(apiUrl,data).subscribe(data=>{
      result = data;
    });
    console.log('En service' + data);
    return data;
  }

  updateProductType(data: any):Observable<any>{
    let apiUrl = `${this.endpoint}/api/ProductType`;
    return this.http.put(apiUrl,data);
  }

  deleteProductType(code:string):Observable<any>{
    let apiUrl = `${this.endpoint}/api/ProductType?id=${code}`;
    return this.http.delete<boolean>(apiUrl);
  }

}
