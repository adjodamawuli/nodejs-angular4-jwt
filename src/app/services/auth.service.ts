import { Injectable } from '@angular/core';

import {Http,Headers,RequestOptions} from '@angular/http';
import * as jwtDecode from 'jwt-decode';
//import { RequestOptions } from '@angular/http/src/base_request_options';

@Injectable()
export class AuthService {
  BASE_URL = 'http://localhost:4201/auth';

  constructor(private http: Http) { }

  login(credentials){
    return this.http.post(`${this.BASE_URL}/login`,credentials)
                    .map(res=>res.json());

  }

  userIsLoggedIn(){
    // !! permet de caster le retour de ce qui suit en boolen (si getItem('job-data') renvoit qlq chose alors ça sera true) 
    return !!localStorage.getItem('jbb-data');
  }
  logOut(){
    localStorage.removeItem('jbb-data');
  }
  register(credentials){
    //console.log('register', credentials);
    return this.http.post(`${this.BASE_URL}/register`,credentials)
             .map(res=>res.json())
  }

  decodeToken(token){
    return jwtDecode(token);
  }

  addAuthorizationHeader(token){
    // 'Authorization': 'Bear azear
    const addAuthorizationHeader = new Headers({
      'Authorization': 'Bearer '+token
    });
    return new RequestOptions({headers:addAuthorizationHeader});
  }
}
