import { HttpClient, HttpParams} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { BASE_URL } from '../models/constants';
import { ProductDto } from '../models/product';
import { ProductTypeDto } from '../models/productType';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  endpoint:string = '';

  constructor(private http: HttpClient, @Inject(BASE_URL) endpoint:string) {
    this.endpoint = endpoint;
  }
  getProducts():Observable<ProductDto[]>{
    let apiUrl = `${this.endpoint}/api/Product`;
    return this.http.get<ProductDto[]>(apiUrl);
  }

  getProductById(code:string):Observable<ProductDto>{
    let apiUrl = `${this.endpoint}/api/Product/${code}`;
    return this.http.get<ProductDto>(apiUrl);
  }

  createProduct(data: any):Observable<any>{
    let result;
    let apiUrl = `${this.endpoint}/api/Product`;
    this.http.post(apiUrl,data).subscribe(data=>{
      result = data;
    });
    console.log('En service' + result);
    return data;
  }

  updateProduct(data: any, code:string):Observable<any>{
    const params = new HttpParams()
      .set('id', code);
    let apiUrl = `${this.endpoint}/api/Product`;
    return this.http.put(apiUrl,data,{params});
  }

  deleteProduct(code:string):Observable<any>{
    const params = new HttpParams()
      .set('id', code);
    let apiUrl = `${this.endpoint}/api/Product`;
    return this.http.delete<boolean>(apiUrl,{params});
  }
}
