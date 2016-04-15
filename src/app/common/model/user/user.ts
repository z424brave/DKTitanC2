import {BaseEntity} from '../../base-entity';


export class User extends BaseEntity {

    name: string;
    email: string;
    password: string;
    role: string;
    status: string;

    constructor() {
        super();
    }

}