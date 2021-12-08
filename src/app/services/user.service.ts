import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  login(email:string, password:string): Observable<string>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post<string>('/login', {email, password});
  }

  signup(user: User): Observable<User>{
    return this.http.post<User>('/signup', user);
  }

  getRole(token: string) {
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData.auth;
  }

  getEmail(token: string) : string{
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    return decodedJwtData.sub; 
  }
}
