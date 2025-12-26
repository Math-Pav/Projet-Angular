import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentsResponse } from '../../../core/models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private baseUrl = 'https://dummyjson.com/comments';

  constructor(private http: HttpClient) {}

  getCommentsByPost(postId: number): Observable<CommentsResponse> {
    return this.http.get<CommentsResponse>(`${this.baseUrl}?postId=${postId}`);
  }
}
