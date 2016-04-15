import {Component, EventEmitter, Input, Output, OnInit, AfterViewInit, ViewChild} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';
import {User} from '../../common/model/user/user';
import {AuthService} from '../../auth/auth-service';
import {ContentNode} from './../../common/model/node/content-node';
import {MainMenu} from '../../menu/menu-component';
import {ContentDetail} from './../detail/content-detail';
import {ContentService} from './../../common/service/content-service';
import {IsoDatePipe} from '../../common/iso-date-pipe';
import {TagSelect} from '../../common/directives/tag-select/tag-select';
import {UserService} from '../../common/service/user-service';
import {TagService} from './../../common/service/tag-service';
import {SearchNode} from './../../common/model/node/search-node';

let _ = require('lodash');

@Component({
    selector: 'node-list',
    directives: [MainMenu, TagSelect, FORM_DIRECTIVES],
    pipes: [IsoDatePipe],
    template: require('./content-list.html'),
    styles: [require('./content-list.css'), require('../../app.css')],
    providers: [ContentService, UserService, TagService]
})

export class ContentList implements OnInit {

    constructor(private _contentService: ContentService,
                private _router: Router,
                private _userService: UserService,
                private _tagService: TagService,
                private _authService: AuthService) {

        this.nodeEmitter = new EventEmitter();
        this.searchNode =  new SearchNode();
    }

    nodes = [];
    @Input() searchNode: SearchNode;
	
    @Output() nodeEmitter: EventEmitter<ContentNode>;

    statuses = ['','active', 'deleted'];
    types = ['','text','html'];
    users = [];
    currentUser: User;

    getUserNodes(userId: string ) {

	console.log(`in getUserNodes for ${userId}`);
        this._contentService.getUserNodes(userId)
            .subscribe(
                data => {
                    this.nodes = data;
                    this.currentUser = this._authService.currentUser;
                }
            );

	}

    getUserList() {

        this._userService.getUsers()
            .subscribe(
                data => {
                    this.users = data;
					console.log(`Users are : ${JSON.stringify(this.users)}`);						
				}
            );

    }

    deleteNode($event, nodeId) {
        $event.preventDefault();
        this._contentService.deleteNode(nodeId)
            .subscribe(
                this.getUserNodes(this._authService.currentUser._id)
            );
    }

    onSelect(node: ContentNode) {
        this._router.navigate(['ContentDetail', {id: node._id}]);
    }

    newContent() {
		console.log("In newContent");	
        this._router.navigate(['ContentDetail', {id: undefined}]);
    }

	search() {
		console.log(`Search params are : ${JSON.stringify(this.searchNode)}`);		
		this.getUserNodes(this.searchNode.user);
	}

	reset($event) {
        $event.preventDefault();	
		console.log("Reset clicked");
		this.setDefaultSearchTerms()		
	}
	
    ngOnInit() {
        this.getUserList();
		this.setDefaultSearchTerms()
        this.getUserNodes(this.searchNode.user);
    }

	setDefaultSearchTerms() {
		this.searchNode.user = this._authService.currentUser._id;
		this.searchNode.type = "";
		this.searchNode.status = "";
		this.searchNode.contains = "";
		this.searchNode.tags = [];	
	}

}
