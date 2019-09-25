import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(
        private http: HttpClient, 
        private injector: Injector,
        ) { }

    public get(url: string, paramObj: any = {}, customMessage = false, contentType = 'application/json') {
        let headers = new HttpHeaders({ 'Content-Type': contentType });
        return this.http
            .get(url + this.toQueryString(paramObj), { headers: headers })
            .toPromise()
            .then((res) => this.extractData(res, customMessage))
            .catch((err) => {
                this.handleError(err);
            });
    }

    public post(url: string, body: any = {}, customMessage = false, ContentType = 'application/json') {
        let headers = new HttpHeaders({ 'Content-Type': ContentType });
        return this.http
            .post(url, body, { headers })
            .toPromise()
            .then((res) => this.extractData(res, customMessage))
            .catch((err) => this.handleError(err));
    }

    public delete(url, body: any = {}, customMessage = false) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http
            .delete(url, { headers, params: body })
            .toPromise()
            .then((res) => this.extractData(res, customMessage))
            .catch((err) => this.handleError(err));
    }
    
    public patch(url: string, body: any = {}, customMessage = false, ContentType = 'application/json') {
        let headers = new HttpHeaders({ 'Content-Type': ContentType });
        return this.http
            .patch(url, body, { headers })
            .toPromise()
            .then((res) => this.extractData(res, customMessage))
            .catch((err) => {
                this.handleError(err);
            });
    }

    public put(url: string, body: any = {}, customMessage = false, ContentType = 'application/json') {
        let headers = new HttpHeaders({ 'Content-Type': ContentType });
        return this.http
            .put(url, body, { headers })
            .toPromise()
            .then((res) => this.extractData(res, customMessage))
            .catch((err) => {
                this.handleError(err);
            });
    }

    public toQueryString(obj) {
        let ret = [];
        for (let key in obj) {
            key = encodeURIComponent(key);
            let values = obj[key];
            if (values && values.constructor === Array) {
                let queryValues = [];
                for (let i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else {
                ret.push(this.toQueryPair(key, values));
            }
        }
        return ret.length > 0 ? '?' + ret.join('&') : '';
    }
    
    private toQueryPair(key, value) {
        if (typeof value === 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    }

    private extractData(res, customMessage: boolean) {
        let body = res;
        if (customMessage) {
            return body;
        } else {
            if (body.code !== '200') {
                let reason = body.reason ? body.reason : '出错了';
                return null;
            } else {
                return body.data !== '' ? body.data : true;
            }
        }
    }

    private handleError(error: HttpErrorResponse) {
        let errMsg: string;
        if (error.status === 403) {
            return false;
        } else if (error.status === 500) {
            // const router = this.injector.get(Router);
            // router.navigate(['**'], { queryParams: { type: 500 }});
        } else {
            errMsg = error.error ? error.error.reason : '出错了';
        }
    }
}
