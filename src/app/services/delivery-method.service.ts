import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../models/constants';
import { DeliveryMethodDto } from '../models/dtos/deliveryMethodDto';

@Injectable({
  providedIn: 'root'
})
export class DeliveryMethodService {

  endpoint:string = '';

  constructor(private http: HttpClient, @Inject(BASE_URL) endpoint:string) {
    this.endpoint = endpoint;
  }

  getDeliveryMethod():Observable<DeliveryMethodDto[]>{
    let apiUrl = `${this.endpoint}/api/DeliveryMethod`;
    return this.http.get<DeliveryMethodDto[]>(apiUrl);
  }

}
