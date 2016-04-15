import {RouterOutlet} from 'angular2/router';
import {Component} from 'angular2/core';
import {RouteConfig, CanActivate} from 'angular2/router';
import {tokenNotExpired} from 'angular2-jwt';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {MainMenu} from '../menu/menu-component';
import {RouterLink} from 'angular2/router';
import {authCheck} from '../auth/auth-check';
import {ComponentInstruction} from 'angular2/router';
import {ContentService} from './../common/service/content-service';
import {ContentDetail} from './detail/content-detail';
import {ContentList} from './list/content-list';


@Component({
    template: require('./node.html'),
    directives: [RouterOutlet, ROUTER_DIRECTIVES, MainMenu],
    providers: [ContentService]
})

//@RouteConfig([
//    {path: '/', name: 'ContentList', component: ContentList, useAsDefault: true},
//    {path: '/:id', name: 'ContentDetail', component: ContentDetail}
//])

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
    return authCheck('user', next, previous);
})
export class NodeComponent {


}