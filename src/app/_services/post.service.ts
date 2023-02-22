import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResConfig } from '../config/resConfig';
import { Post } from '../_models/post';
import { AapiService } from './aapi.service';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private apiService: AapiService) { }

  // get all posts
  public getPosts() {
    return this.apiService.getX("/posts");
  }

  // get post
  public getPost(id: string): Observable<Post | null> {
    let postSubject = new BehaviorSubject<Post>({});

    this.apiService.getX(`/posts/${id}`).subscribe(
      res => {
        postSubject.next(res.data);
      }
    );

    return postSubject.asObservable();
  }
}
