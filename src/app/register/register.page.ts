import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AuthenticationService} from '../_services/authentication-service.module';
import {AlertService} from '../_services/alert-service.module';
import {UserService} from '../_services/user-service.module';

@Component({templateUrl: 'register.page.html', styleUrls: ['./register.page.scss'], providers: [AuthenticationService, AlertService]})
export class RegisterPage implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue()) {
            this.router.navigate(['/']);
        }
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/tabs/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
