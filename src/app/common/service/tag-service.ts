import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {EventEmitter} from 'angular2/core';
import {HttpClient} from '../../common/http-client';
import {Observable} from 'rxjs/Observable';
import {Notification} from '../directives/notification-center/notification';
import {ApplicationError} from '../../common/error';
import {API_ENDPOINT} from '../../config';
import {NotificationService} from './notification-service';
import {Tag} from '../model/lexicon/tag';
import {LegacyHtmlParser} from 'angular2/src/compiler/legacy_template';
import {Lexicon} from '../model/lexicon/lexicon';

@Injectable()
export class TagService {

    private baseUrl: string;

    constructor(private _httpClient: HttpClient,
                private _notificationService: NotificationService) {
        this.baseUrl = API_ENDPOINT.concat('/lexicons/');
    }

    getLexicons() {
        var that = this;
        return Observable.create(observer => {
            this._httpClient.get(this.baseUrl)
                .map((responseData) => {
				    console.log(`Lexicons : ${JSON.stringify(responseData)}`);
                    return responseData.json();
                })
                .subscribe(
                    data => observer.next(data),
                    err => {
                        that._notificationService.handleError(
                            new ApplicationError(
                                'Error loading lexicons',
                                err));
                    }
                    ,
                    () => observer.complete()
                );
        });
    }

    getTags(lexiconId) {
	    console.log(`In getTags - ${lexiconId}`);
        var that = this;
        return Observable.create(observer => {
            this._httpClient.get(this.baseUrl.concat(lexiconId).concat('/tags/'))
                .map((responseData) => {
                    return responseData.json();
                })
                .subscribe(
                    data => observer.next(data),
                    err => {
                        that._notificationService.handleError(
                            new ApplicationError(
                                'Error loading tags',
                                err));
                    }
                    ,
                    () => observer.complete()
                );
        });
    };

    updateTag(lexiconId: string, tag: Tag) {
        var that = this;
        console.log('update : ' + tag.name);
        return Observable.create(observer => {
                this._httpClient.put(this.baseUrl.concat(lexiconId).concat('/tags'), JSON.stringify(tag))
                    .map((responseData) => {
						console.log(`update : ${tag.name} ${responseData.json()}`);					
                        return responseData.json();
                    })
                    .subscribe(
                        data => {
                            observer.next('SUCCESS');
                        },
                        err => {
                            that._notificationService.handleError(
                                new ApplicationError(
                                    'Error updating tag',
                                    err));
                        }
                        ,
                        () => observer.complete()
                    );
            }
        );
    }

    saveLexicon(lexicon: Lexicon) {
        var that = this;
        return Observable.create(observer => {
                this._httpClient.post(this.baseUrl, JSON.stringify(lexicon))
                    .map((responseData) => {
                        return responseData.json();
                    })
                    .subscribe(
                        data => {
                            observer.next(data);
                            that._notificationService.publish(new Notification(
                                'Lexicon saved successfully',
                                Notification.types.SUCCESS));

                        },
                        err => {
                            that._notificationService.handleError(
                                new ApplicationError(
                                    'Error saving lexicon',
                                    err));
                        }
                        ,
                        () => observer.complete()
                    );
            }
        );

    }

    updateLexicon(lexicon: Lexicon) {
        var that = this;
        return Observable.create(observer => {
                this._httpClient.put(this.baseUrl, JSON.stringify(lexicon))
                    .map((responseData) => {
                        return responseData.json();
                    })
                    .subscribe(
                        data => {
                            observer.next('SUCCESS');
                            that._notificationService.publish(new Notification(
                                'Lexicon updated successfully',
                                Notification.types.SUCCESS));
                        },
                        err => {
                            that._notificationService.handleError(
                                new ApplicationError(
                                    'Error updating lexicon',
                                    err));
                        }
                        ,
                        () => observer.complete()
                    );
            }
        );

    }

    deleteLexicon(lexicon: Lexicon) {
        var that = this;
        return Observable.create(observer => {
                this._httpClient.delete(this.baseUrl.concat(lexicon._id))
                    .map((responseData) => {
                        return responseData.json();
                    })
                    .subscribe(
                        data => {
                            observer.next('SUCCESS');
                            that._notificationService.publish(new Notification(
                                'Lexicon deleted successfully',
                                Notification.types.SUCCESS));

                        },
                        err => {
                            that._notificationService.handleError(
                                new ApplicationError(
                                    'Error deleting lexicon',
                                    err));
                        }
                        ,
                        () => observer.complete()
                    );
            }
        );

    }

    addTag(lexiconId: string, tag: Tag) {
        var that = this;
        return Observable.create(observer => {
                this._httpClient.post(this.baseUrl.concat(lexiconId).concat('/tags'), JSON.stringify(tag))
                    .map((responseData) => {
                        return responseData.json();
                    })
                    .subscribe(
                        data => {
                            observer.next('SUCCESS');
                        },
                        err => {
                            that._notificationService.handleError(
                                new ApplicationError(
                                    'Error adding tag',
                                    err));
                        }
                        ,
                        () => observer.complete()
                    );
            }
        );

    }

    deleteTag(lexiconId: string, tagId: string) {
        var that = this;
        return Observable.create(observer => {
                this._httpClient.delete(this.baseUrl.concat(lexiconId).concat('/tags/').concat(tagId))
                    .map((responseData) => {
                        return responseData.json();
                    })
                    .subscribe(
                        data => {
                            observer.next('SUCCESS');
                        },
                        err => {
                            that._notificationService.handleError(
                                new ApplicationError(
                                    'Error deleting tag',
                                    err));
                        }
                        ,
                        () => observer.complete()
                    );
            }
        );

    }

}
