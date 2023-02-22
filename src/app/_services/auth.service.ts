import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ResConfig } from '../config/resConfig';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootURL = environment.apiUrl;
  private tokenSubject: BehaviorSubject<String | null>;
  private userSubject: BehaviorSubject<User | null>;
  public token: Observable<String | null>;
  public user: Observable<User | null>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
    this.tokenSubject = new BehaviorSubject<String | null>(JSON.parse(localStorage.getItem('token')!));
    this.token = this.tokenSubject.asObservable();
  }

  public get tokenValue() {
    return this.tokenSubject.value;
  }

  public get userValue() {
    return this.userSubject.value;
  }

  // login
  login(params: any){
    return this.http.post<ResConfig>(this.rootURL + '/users/login', params, this.httpOptions)
          .pipe(map(res => {
            localStorage.setItem('token', JSON.stringify(res.token));
            localStorage.setItem('user', JSON.stringify(res.data));
            this.tokenSubject.next(res.token);
            this.userSubject.next(res.data);
            return res;
          }));
  }

  // logout
  logout(){
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }

}
