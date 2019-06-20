import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FriendsProviderService {
    constructor(private http: HttpClient) {
    }

    getFriends() {
        return this.http.get<any>(`${environment.API_URL}/friendships`)
            .pipe(map(friends => friends.data));
    }

    getFriendsRequests() {
        return this.http.get<any>(`${environment.API_URL}/friendships/waiting`)
            .pipe(map(requests => requests.data));
    }

    acceptRequest(id) {
        return this.http.patch<any>(`${environment.API_URL}/friendships/${id}`, { friendship: { accepted: true } });
    }

    refuseRequest(id) {
        return this.http.delete<any>(`${environment.API_URL}/friendships/${id}`);
    }

    addFriend(mail) {
        return this.http.post<any>(`${environment.API_URL}/friendships/`, { friendship: { email: mail } });
    }

    deleteFriend(id) {
        return this.http.delete<any>(`${environment.API_URL}/friendships/${id}`);
    }
}
