import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MComment } from '../models/comments';

@Injectable()
export class CommentsService {

  constructor(private http: HttpClient) { }

  getAll(query: String): Observable<MComment[]> {
    return this.http.get<MComment[]>(`/events/comments${query}`);
  }

  post(data) {
    this.http.post<MComment>(`/events/comments`, data).subscribe();
  }

  put(query, data) {
    this.http.put<MComment>(`/events/comments${query}`, data).subscribe();
  }

  delete(query) {
    this.http.delete<MComment>(`/events/comments${query}`).subscribe();
  }
}
