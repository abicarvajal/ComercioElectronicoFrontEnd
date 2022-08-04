import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BASE_URL } from '../models/constants';
import { ProductDto } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  endpoint:string = ''

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
    this.http.post(apiUrl,data).pipe(catchError(this.error)).subscribe(data=>{
      result = data;
    });
    console.log('En service' + data);
    return data;
  }

  updateProduct(data: any):Observable<any>{
    let apiUrl = `${this.endpoint}/api/Product`;
    return this.http.put(apiUrl,data).pipe(catchError(this.error));
  }

  deleteProduct(code:string):Observable<any>{
    let apiUrl = `${this.endpoint}/api/Product?id=${code}`;
    return this.http.delete<boolean>(apiUrl);
  }

  error(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message
    }else{
      errorMessage = `Codigo error: ${error.status} mensaje : ${error.message}`
    }
    console.log(errorMessage);
    return throwError(()=> {return errorMessage});
  }
}
