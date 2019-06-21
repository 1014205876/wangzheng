import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpServe {

    constructor(
        private http: HttpClient
    ) { }

    async get(url: string, params?: object, custom = false, contentType = 'application/json') {
        let headers = new HttpHeaders({ 'Content-Type': contentType })
        return this.http.get(url + this.formatParams(params), { headers })
            .toPromise()
            .then((res: any) => {
                this.extractData(custom, res)
            })
            .catch((err: any) => {
                // this.handleError(err.error)
            })
    }
    async post(url: string, params: any = {}, custom = false, ContentType = 'application/json') {
        let headers = new HttpHeaders({ 'Content-Type': ContentType })
        return this.http
            .post(url, params, { headers })
            .toPromise()
            .then((res) => this.extractData(custom, res))
            .catch((err) => this.handleError(err.error))
    }

    async put(url: string, body: any = {}, custom = false, ContentType = 'application/json') {
        let headers = new HttpHeaders({ 'Content-Type': ContentType })
        return this.http
            .put(url, body, { headers })
            .toPromise()
            .then((res) => this.extractData(custom, res))
            .catch((err) => {
                this.handleError(err.error)
            })
    }

    async delete(url: string, body: any = {}, custom = false) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http
            .delete(url, { headers, params: body })
            .toPromise()
            .then((res) => this.extractData(custom, res))
            .catch((err) => this.handleError(err.error))
    }


    async patch(url: string, body: any = {}, custom = false, ContentType = 'application/json') {
        let headers = new HttpHeaders({ 'Content-Type': ContentType })
        return this.http
            .patch(url, body, { headers })
            .toPromise()
            .then((res) => this.extractData(custom, res))
            .catch((err) => {
                this.handleError(err.error)
            })
    }


    getApiNull(url: string): Promise<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return new Promise((resolve, reject) => {
            this.http.get(url, { headers }).subscribe(
                (res: any) => {
                    if ((!res.code) || res.code == '200') {
                        resolve(res.data ? res.data : res);
                    }
                    else {
                        reject(res.reason);
                    }
                },
                (error) => {
                    reject(error.statusText);
                });
        })
    }

    extractData(custom: boolean, res: any) {
        let body = res
        if (custom) {
            return body
        } else {
            if (body.code == '200') {
                return body.data ? body.data : ''
            } else {
                let reason = body.reason ? body.reason : '出错了'
                this.handleError(reason)
            }
        }
    }

    formatParams(params: object) {
        let result = []
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                result.push(this.toQueryPair(key, params[key]))
            }

        }
        return result.length ? '?' + result.join('&') : ''
    }

    private toQueryPair(key: any, value: any) {
        if (typeof value == 'undefined') {
            return key
        }
        return key + '=' + value
    }

    handleError(err: any) {
        alert(err)
    }

}

