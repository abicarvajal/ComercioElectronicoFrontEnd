import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { BASE_URL } from '../models/constants';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  endpoint:string = ''
  headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http: HttpClient, @Inject(BASE_URL) endpoint:string) {
    this.endpoint = endpoint;
  }

  getBrands():Observable<Brand[]>{
    let apiUrl = `${this.endpoint}/api/Brand`;
    return this.http.get<Brand[]>(apiUrl);
  }

  getBrandById(code:string):Observable<Brand>{
    let apiUrl = `${this.endpoint}/api/Brand/${code}`;
    return this.http.get<Brand>(apiUrl);
  }

  createBrand(data: any):Observable<any>{
    let result;
    let apiUrl = `${this.endpoint}/api/Brand`;
    this.http.post(apiUrl,data).subscribe(data=>{
      result = data;
    });
    return data;
  }

  updateBrand(data: any):Observable<any>{
    let apiUrl = `${this.endpoint}/api/Brand`;
    return this.http.put(apiUrl,data);
  }

  deleteBrand(code:string):Observable<any>{
    let apiUrl = `${this.endpoint}/api/Brand?id=${code}`;
    return this.http.delete<boolean>(apiUrl);
  }

}
