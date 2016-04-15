import {Pipe, PipeTransform} from 'angular2/core';
import {User} from './model/user/user';

let _ = require('lodash');

@Pipe({name: 'nameSort'})

export class NameSort implements PipeTransform {
    transform(users: Array<User>): Array<User> {
        return _.sortBy(users, function (user) {
            return user.name;
        });

    }
}
