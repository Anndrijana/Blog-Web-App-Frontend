import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { Comment } from '../model/comment';

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) { }

  addComment(newComment: Comment, id: number): Observable<Comment>{
    return this.http.post<Comment>(`/posts/${id}/comments`,newComment);
  }

  updateComment(id: number, post: Comment) : Observable<Comment> {
    return this.http.put<Comment>(`/comments/${id}`, post);
  }

  deleteComment(id: Number, idPost: number): Observable<{}>{
    return this.http.delete(`posts/${idPost}/comments/${id}`);
  }
}
