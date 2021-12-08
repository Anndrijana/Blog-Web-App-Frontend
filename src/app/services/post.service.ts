import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Post } from '../model/post';


@Injectable()
export class PostService {

  constructor(private http: HttpClient) {
  }

  addPost(newPost: Post): Observable<Post> {
    return this.http.post<Post>('/posts', newPost);
  }

  findOne(id: number): Observable<Post> {
    return this.http.get<Post>(`/posts/${id}`);
  }

  findAll(): Observable<Post[]> {
    return this.http.get<Post[]>('/posts');
  }

  findAllApproved(): Observable<Post[]> {
    return this.http.get<Post[]>('/posts/approved');
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`/posts/${id}`, post);
  }

  deletePost(id: number): Observable<{}> {
    return this.http.delete(`/posts/${id}`);
  }

  approvePost(id: number): Observable<Post> {
    return this.http.put<Post>(`/posts/${id}/approve`, {});
  }

  ratePost(post: Post): Observable<any> {
    return this.http.post<Post>(`/posts/${post.id}/rate`, post);
  }
}
