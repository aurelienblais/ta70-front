import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../_services/authentication-service.module';
import {Router} from '@angular/router';
import {User} from '../_models/user';
import {UserService} from '../_services/user-service.module';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
    providers: [AuthenticationService]
})
export class ProfilePage implements OnInit {
    user: User;
    environment = environment;

    constructor(private authService: AuthenticationService, private router: Router, private userService: UserService) {
        this.user = authService.currentUserValue();
    }

    ngOnInit() {
    }

    logOut() {
        this.userService.delete();
        location.replace('/');
    }

}
