import {Injectable, EventEmitter} from 'angular2/core';
import {Notification} from './../directives/notification-center/notification';
import {ApplicationError} from '../error';

@Injectable()
export class NotificationService {

    eventBus: EventEmitter<any>;
    private defaultTimeout: number = 4000;

    constructor() {
        this.eventBus = new EventEmitter();
    }

    publish(notification: Notification) {
	    console.log(`Publishing : ${JSON.stringify(notification)}`);
        if (notification.type === Notification.types.SUCCESS) {
            var successMessage = {
                msg: notification.message,
                type: notification.type,
                dismissible: false,
                dismissOnTimeout: this.defaultTimeout
            };
            this.eventBus.emit(successMessage);
        }
        if (notification.type === Notification.types.WARNING ||
            notification.type === Notification.types.ERROR) {
            var alertMessage = {
                msg: notification.message,
                type: notification.type,
                dismissible: true
            };
            this.eventBus.emit(alertMessage);
        }
    }

    handleError(error: ApplicationError) {
        console.log(error);
        this.publish(new Notification(
            error.message,
            Notification.types.ERROR)
        );
    }

}
