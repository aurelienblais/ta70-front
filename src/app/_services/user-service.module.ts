import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {environment} from '../../environments/environment';
import {AuthenticationService} from './authentication-service.module';

@Injectable({providedIn: 'root'})
export class UserService {
    constructor(private http: HttpClient, private authService: AuthenticationService) {
    }

    register(user: User) {
        return this.http.post(`${environment.API_URL}/users/`,
            {user: {email: user.username, password: user.password, firstname: user.firstName, lastname: user.lastName}});
    }

    update(user: User) {
        return this.http.put(`${environment.API_URL}/users/${user.id}`, user);
    }

    delete() {
        this.authService.logout();
        return this.http.delete(`${environment.API_URL}/users/sign_out`);
    }
}
