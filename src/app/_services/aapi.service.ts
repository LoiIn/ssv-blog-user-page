import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResConfig } from '../config/resConfig';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AapiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // GET
  public getX(endpoint: string): Observable<ResConfig> {
    return this.http
    .get<ResConfig>(API_URL +  endpoint, this.httpOptions);
  }

  // POST
  public postX(endpoint: string, data: any): Observable<ResConfig>  {
    return this.http
    .post<ResConfig>(API_URL + endpoint, data, this.httpOptions);
  }

  // DELETE
  public deleteX(endpoint: string): Observable<ResConfig>  {
    return this.http
    .delete<ResConfig>(API_URL + endpoint, this.httpOptions);
  }
}
