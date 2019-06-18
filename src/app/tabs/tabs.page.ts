import {Component, OnInit} from '@angular/core';
import {User} from '../_models/user';
import {AuthenticationService} from '../_services/authentication-service.module';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
    currentUser: User;

    constructor(private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.authService.currentUser.subscribe(user => this.currentUser = user);
    }
}
