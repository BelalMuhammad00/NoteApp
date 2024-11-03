import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:BehaviorSubject<any>=new BehaviorSubject(null);

  constructor(private _http: HttpClient,private _router:Router) {

    this.userData();
  }

  register(formData:object): Observable<any>{
return this._http.post(`https://movies-api.routemisr.com/signup`,formData)
  };

  login(formData:object): Observable<any>{
    return this._http.post(`https://movies-api.routemisr.com/signin`,formData)
      }

      userData():void{
const token = localStorage.getItem('userToken');

if(token){
  const userData = jwtDecode(token);
  this.user.next(userData);
  this._router.navigate(['/home']);
}
      }
}


