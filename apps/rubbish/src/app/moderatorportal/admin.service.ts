import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminService {

    constructor(
        private readonly http: HttpClient
    ) {}

    getUsers(): Observable<any[]> {
        return this.http.get<{ users: any[] }>('/api/users')
            .pipe(
                map(x => x.users.map(user => ({
                  name: (user.facebook || {}).name || (user.google || {}).name || (user.email || '').split('@')[0] || 'New User',
                  username: ((user.facebook || {}).name
                    || (user.google || {}).name
                    || (user.email || '').split('@')[0]
                    || 'New User').replace(' ', '').toLowerCase(),
                  ...user
                })))
                );
    }

    deleteUser(id: string) {
        return this.http.post('/api/delete-user', { id });
    }

}
