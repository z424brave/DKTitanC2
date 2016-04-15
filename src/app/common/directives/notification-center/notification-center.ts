import {CORE_DIRECTIVES} from 'angular2/common';
import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {NotificationService} from '../../service/notification-service';
import {Alert} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'notification-center',
    template: require('./notification-center.html'),
    styles: [require('./notification-center.css')],
    directives: [Alert, CORE_DIRECTIVES]
})

export class NotificationCenter implements OnInit {

    constructor(private _notificationService: NotificationService) {

    }

    notifications: Array<Object> = [];

    closeNotification(i: number) {
        this.notifications.splice(i, 1);
    }

    ngOnInit() {
        this._notificationService.eventBus.subscribe(notification =>
            this.onNotificationReceived(notification));
    }

    private onNotificationReceived(notification) {
	    console.log(`Pushing ${JSON.stringify(notification)}`);
        this.notifications.push(notification);
    }

}
