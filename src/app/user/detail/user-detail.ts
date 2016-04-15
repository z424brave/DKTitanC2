import {Component} from 'angular2/core';
import {User} from '../../common/model/user/user';
import {UserService} from '../../common/service/user-service';
import {Router, RouteParams, RouteConfig, CanActivate, ComponentInstruction} from 'angular2/router';
import {HttpClient} from '../../common/http-client';
import {NotificationService} from '../../common/service/notification-service';
import {Notification} from '../../common/directives/notification-center/notification';
import {FORM_DIRECTIVES,
    FormBuilder,
    Validators,
    AbstractControl,
    ControlGroup} from 'angular2/common';
import {OnInit} from 'angular2/core';
import {tokenNotExpired} from 'angular2-jwt';
import {authCheck} from '../../auth/auth-check';


@Component({
    directives: [FORM_DIRECTIVES],
    providers: [UserService, HttpClient],
    template: require('./user-detail.html'),
    styles: [require('./user-detail.css'), require('../../app.css')],
    inputs: ['user']
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return authCheck('admin', next, previous);
})
export class UserDetail implements OnInit {

    user: User;
    roles = ['admin', 'user'];
    statuses = ['active', 'deleted'];
    userForm: ControlGroup;
    name: AbstractControl;
	email: AbstractControl;
	role: AbstractControl;
	status: AbstractControl;	
    submitted: boolean = false;

    constructor(private _formBuilder: FormBuilder,
                private _userService: UserService,
                private _routeParams: RouteParams,
                private _router: Router) {
    }

    submitUser(value) {
        var that =  this;
        this.submitted = true;
		console.log(`in submitUser - ${this.userForm.valid}`);
        if (this.userForm.valid) {
            this._userService.saveUser(this.user).subscribe(
                data => {
                     that.user =  data;
                    //that._router.navigate(['User'])
                }
            );
        } else {
		
			console.log(`Name is ${this.name.value} ${this.name.valid}`);
			console.log(`Email is ${this.email.value} ${this.email.valid}`);
			console.log(`Role is ${this.role.value} ${this.role.valid}`);
			console.log(`Status is ${this.status.value} ${this.status.valid}`);
			
		}
    }


    ngOnInit() {
        //console.log('User detail init');
        let id = this._routeParams.get('id');
        if (id) {
            this.getUser(id);
        } else {
            this.user = new User();
            this.initForm();
        }
    }

    initForm() {
        console.log('initiating form: ' + JSON.stringify(this.user));
        this.userForm = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            role: ['', Validators.required],
            status: ['', Validators.required]
        });

        this.name = this.userForm.controls['name'];
        this.email = this.userForm.controls['email'];
        this.role = this.userForm.controls['role'];
        this.status = this.userForm.controls['status'];
		
    }


    cancel($event) {
        $event.preventDefault();
        this._router.navigate(['User']);
    }



    private getUser(id: string) {
        this._userService.getUser(id).subscribe(
            data => {
                this.user = data;
                this.initForm();
            }
        );
    }

}


