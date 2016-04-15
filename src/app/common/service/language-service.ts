import {Injectable} from 'angular2/core';
import {HttpClient} from '../http-client';
import {API_ENDPOINT} from '../../config';
import {Observable} from 'rxjs/Observable';
import {ApplicationError} from '../error';
import {NotificationService} from './notification-service';


@Injectable()
export class LanguageService {

    private baseUrl: string;

    constructor(
        private _httpClient: HttpClient,
        private _notificationService: NotificationService) {
        this.baseUrl = API_ENDPOINT.concat('/languages/');
    }

    getLanguages() {
        var that = this;
        return Observable.create(observer => {
            this._httpClient.get(this.baseUrl)
                .map((responseData) => {
                    return responseData.json();
                })
                .subscribe(
                    data => observer.next(data),
                    err => {
                        that._notificationService.handleError(
                            new ApplicationError(
                                'Error loading languages',
                                err));
                    }
                    ,
                    () => observer.complete()
                );
        });
    }

}

