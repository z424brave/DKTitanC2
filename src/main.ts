import {provide} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, PathLocationStrategy} from 'angular2/router';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {appInjector} from './app/common/app-injector';
import {AuthService} from './app/auth/auth-service';

import {App} from './app/app';
import {HttpClient} from './app/common/http-client';
import {NotificationService} from './app/common/service/notification-service';


document.addEventListener('DOMContentLoaded', function main() {
	console.log(`Running app in ${process.env.NODE_ENV} pointing at ${process.env.API}`);
	bootstrap(App, [
        AuthService,
        HttpClient,
        NotificationService,
        ...('production' === process.env.ENV ? [] : ELEMENT_PROBE_PROVIDERS),
        ...HTTP_PROVIDERS,
        ...ROUTER_PROVIDERS,
        provide(LocationStrategy, {useClass: PathLocationStrategy}),
        provide(AuthHttp, {
            useFactory: (http) => {
                return new AuthHttp(new AuthConfig(), http);
            },
            deps: [Http]
        })
    ])
        .then((appRef) => appInjector(appRef.injector))
        .catch(err => console.error(err));
});
