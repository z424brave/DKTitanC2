import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, ComponentInstruction, RouteConfig, CanActivate} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';

import {UserService} from './../common/service/user-service';
import {UserList} from './list/user-list';
import {UserDetail} from './detail/user-detail';
import {MainMenu} from '../menu/menu-component';
import {authCheck} from '../auth/auth-check';

@Component({
    template: require('./user.html'),
    directives: [ROUTER_DIRECTIVES, MainMenu],
    providers: [UserService]
})

@RouteConfig([
    {path: '/', name: 'UserList', component: UserList, useAsDefault: true},
    {path: '/:id', name: 'UserDetail', component: UserDetail}
])

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return authCheck('admin', next, previous);
})

export class UserComponent {

    constructor(private _router: Router){

    }

}
