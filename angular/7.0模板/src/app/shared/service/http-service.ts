import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(
        private http: HttpClient
    ) {

    }

    public get(url: string, paramObj: any = {}, contentType = 'application/json') {
        let headers = new HttpHeaders({ 'Content-Type': contentType });
        return this.http
            .get(url + this.toQueryString(paramObj), { headers: headers })
            .toPromise()
            .then((res) => { return res })
            .catch((err) => { return err });
    }

    public post(url: string, body: any = {}, ContentType = 'application/json') {
        let headers = new HttpHeaders({ 'Content-Type': ContentType });
        return this.http
            .post(url, body, { headers })
            .toPromise()
            .then((res) => { return res })
            .catch((err) => { return err });
    }

    public delete(url, body: any = {}) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http
            .delete(url, { headers, params: body })
            .toPromise()
            .then((res) => { return res })
            .catch((err) => { return err });
    }

    public patch(url: string, body: any = {}, ContentType = 'application/json') {
        let headers = new HttpHeaders({ 'Content-Type': ContentType });
        return this.http
            .patch(url, body, { headers })
            .toPromise()
            .then((res) => { return res })
            .catch((err) => { return err });
    }

    public put(url: string, body: any = {}, ContentType = 'application/json') {
        let headers = new HttpHeaders({ 'Content-Type': ContentType });
        return this.http
            .put(url, body, { headers })
            .toPromise()
            .then((res) => { return res })
            .catch((err) => { return err });
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
}
