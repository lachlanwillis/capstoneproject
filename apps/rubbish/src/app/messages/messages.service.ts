import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private readonly http: HttpClient) { }

  getMyMessages(filter?: string) {
    return this.http.get<any[]>('/api/my-messages');
  }

  clearMessage(id: string) {
    return this.http.delete(`/api/my-message/${id}`)
      .pipe(take(1));
  }
}
