import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {User} from '../../common/model/user/user';
import {UserDetail} from '../detail/user-detail';
import {UserService} from '../../common/service/user-service';
import {NameSort} from '../../common/name-sort-pipe';

@Component({
    selector: 'user-list',
    directives: [UserDetail],
    providers: [UserService],
    styles: [require('./user-list.css'), require('../../app.css')],
    pipes:[NameSort],
    template: require('./user-list.html')

})

export class UserList implements OnInit {

    constructor(private _userService: UserService,
                private _router: Router) {
    }

    public users = [];

    getUsers() {
        this._userService.getUsers()
            .subscribe(
                data => this.users = data
            );

    }

    onSelect(user: User) {
        console.log('Selected ' + user.name);
        this._router.navigate(['UserDetail', {id: user._id}]);
    }

    newUser() {
        this._router.navigate(['UserDetail', {id: undefined}]);
    }


    ngOnInit() {
        this.getUsers();
    }

}
