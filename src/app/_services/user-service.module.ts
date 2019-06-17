import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {User} from '../_models/user';
import {APIURL} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${APIURL}/users`);
    }

    getById(id: number) {
        return this.http.get(`${APIURL}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${APIURL}/users/`,
            {user: {email: user.username, password: user.password, firstname: user.firstName, lastname: user.lastName}});
    }

    update(user: User) {
        return this.http.put(`${APIURL}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${APIURL}/users/${id}`);
    }
}