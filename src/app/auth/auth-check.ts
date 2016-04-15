import {Injector} from 'angular2/core';
import {AuthService} from './auth-service';
import {Router, ComponentInstruction} from 'angular2/router';
import {HttpClient} from '../common/http-client';
import {NotificationCenter} from '../common/directives/notification-center/notification-center';
import {Inject} from 'angular2/core';
import {appInjector} from '../common/app-injector';


export const authCheck = (role: string, next: ComponentInstruction, previous: ComponentInstruction) => {
    let injector: Injector = appInjector();
    let router: Router = injector.get(Router);
    let authService: AuthService = injector.get(AuthService);

    return new Promise((resolve) => {

        var result = authService.authorise(role);
        if (result) {
            resolve(true);
        } else {
            resolve(false);
            router.navigate(['/Login']);
        }
    });
};




