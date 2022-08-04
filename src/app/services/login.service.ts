import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { BASE_URL } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endpoint:string = ''

  constructor(private http: HttpClient, @Inject(BASE_URL) endpoint:string) {
    this.endpoint = endpoint;
  }

  getToken(data:any):void{
    let apiUrl = `${this.endpoint}/api/Token`;
    this.http.post(apiUrl,data,{responseType: 'text'}).pipe(catchError(this.error)).subscribe(data=>{
      console.log(data);
      localStorage.setItem('token',data);
    });
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
