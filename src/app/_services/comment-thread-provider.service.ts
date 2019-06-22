import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentThreadProviderService {

  constructor(private http: HttpClient) { }

  get(id) {
    return this.http.get<any>(`${environment.API_URL}/comment_threads/${id}`);
  }

  createComment(id, comment, note) {
    return this.http.post<any>(`${environment.API_URL}/comment_threads/${id}/comments`, { comment: { comment: comment, note: note } });
  }
}
