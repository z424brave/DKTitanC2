import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {AuthService} from '../auth/auth-service';
import {LoginUser} from '../common/model/user/login-user';
import {UserService} from '../common/service/user-service';
import {NotificationService} from '../common/service/notification-service';
import {Notification} from '../common/directives/notification-center/notification';
import {ApplicationError} from '../common/error';

@Component({
    selector: 'login-form',
    providers: [UserService],
    template: require('./login.html'),
    styles: [require('./login.css'), require('../app.css')]
})

export class LoginComponent {

    submitted = false;

    user: LoginUser;

    invalidCredentials: boolean;

    constructor(private _authService: AuthService,
                private _notificationService: NotificationService,
                private _router: Router) {
        this.user = new LoginUser();
        this._authService.logout();
    }

    onSubmit(valid) {
        this.submitted = true;
        this.invalidCredentials = false;
		console.log(`In onSubmit in Login - ${valid}`);
        if (valid) {
            this._authService.authenticate(this.user)
                .subscribe(response => {
				        console.log(`Response - ${response}`);
                        if (response === 'SUCCESS') {
						    this._notificationService.publish(new Notification('Login Successful',Notification.types.SUCCESS));
                            this._router.navigate(['/Home']);
                        } else {
                            this.invalidCredentials = true;
                        }
                    },
                    err => this._notificationService.handleError(
                        new ApplicationError('Login connection error', err)
                    ))
        }

    }

}
