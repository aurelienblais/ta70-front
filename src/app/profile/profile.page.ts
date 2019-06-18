import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services/authentication-service.module';
import {Router} from '@angular/router';
import {User} from '../_models/user';
import {UserService} from '../_services/user-service.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers: [AuthenticationService]
})
export class ProfilePage implements OnInit {
  user: User;

  constructor(private authService: AuthenticationService, private router: Router, private userService: UserService) {
    this.user = authService.currentUserValue();
  }

  ngOnInit() {
  }

  logOut() {
    this.userService.delete();
    this.router.navigate(['/mapscreen']);
  }

}
