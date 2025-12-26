import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, PostsResponse } from '../../../core/models/post.model';

@Injectable({ providedIn: 'root' })
export class PostService {
  private baseUrl = 'https://dummyjson.com/posts';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(this.baseUrl);
  }

  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${postId}`);
  }

  getPostsByUser(userId: number): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(`${this.baseUrl}?userId=${userId}`);
  }
}
