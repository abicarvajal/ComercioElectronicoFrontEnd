import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../models/constants';
import { Observable } from 'rxjs';
import { CreateOrderDto } from '../models/dtos/createOrderDto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  endpoint:string = ''

  constructor(private http: HttpClient, @Inject(BASE_URL) endpoint:string) {
    this.endpoint = endpoint;
  }

  createOrder(data:any):Observable<any>{
    let result;
    let apiUrl = `${this.endpoint}/api/Order`;
    this.http.post(apiUrl,data).subscribe(response=>{
      result = response;
      return result;
    });
    return data;
  }
}
