import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {AuthHttp} from 'angular2-jwt';


@Injectable()
export class HttpClient {


    constructor(private _http: Http,
                private _authHttp: AuthHttp) {

    }

    //TODO add interceptor: if 401/403 => logout

    get(url) {
        let headers = new Headers();
        return this._authHttp.get(url, {
            headers: headers
        });
    }

    post(url, data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._authHttp.post(url, data, {
            headers: headers
        });
    }


    postUnsec(url, data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(url, data, {
            headers: headers
        });
    }


    put(url, data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._authHttp.put(url, data, {
            headers: headers
        });
    }


    delete(url) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._authHttp.delete(url, {
            headers: headers
        });
    }




}
