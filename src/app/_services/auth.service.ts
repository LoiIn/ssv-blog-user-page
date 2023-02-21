import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootURL = 'http://localhost:8000/ssv-blog/api/v1';
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  // login
  login(data: any){
    return this.http.post<User>(this.rootURL + '/users/login', data, this.httpOptions)
          .pipe(map(user => {
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
          }));
  }

  // logout
  logout(){
    localStorage.removeItem('user');
    this.userSubject.next({});
    this.router.navigate(['/login']);
  }

}
