import { Injectable } from '@angular/core';
import { PopSerService } from '../pop-ser/pop-ser.service'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
export class HttpService {

  constructor(private popSer: PopSerService, private http: HttpClient) { }

  get(url: string, paramObj: any = {}, customMessage = false, contentType = 'application/json') {
    let headers = new HttpHeaders({ 'Content-Type': contentType })
    return this.http
      .get(url + this.toQueryString(paramObj), { headers: headers })
      .toPromise()
      .then((res) => this.extractData(res, customMessage))
      .catch((err) => {
        this.handleError(err)
      })
  }
  post(url: string, body: any = {}, customMessage = false, ContentType = 'application/json') {
    let headers = new HttpHeaders({ 'Content-Type': ContentType })
    return this.http
      .post(url, body, { headers })
      .toPromise()
      .then((res) => this.extractData(res, customMessage))
      .catch((err) => this.handleError(err))
  }
  delete(url, body: any = {}, customMessage = false) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http
      .delete(url, { headers, params: body })
      .toPromise()
      .then((res) => this.extractData(res, customMessage))
      .catch((err) => this.handleError(err))
  }
  patch(url: string, body: any = {}, customMessage = false, ContentType = 'application/json') {
    let headers = new HttpHeaders({ 'Content-Type': ContentType })
    return this.http
      .patch(url, body, { headers })
      .toPromise()
      .then((res) => this.extractData(res, customMessage))
      .catch((err) => {
        this.handleError(err)
      })
  }
  put(url: string, body: any = {}, customMessage = false, ContentType = 'application/json') {
    let headers = new HttpHeaders({ 'Content-Type': ContentType })
    return this.http
      .put(url, body, { headers })
      .toPromise()
      .then((res) => this.extractData(res, customMessage))
      .catch((err) => {
        this.handleError(err)
      })
  }
  toQueryString(obj) {
    let ret = []
    for (let key in obj) {
      key = encodeURIComponent(key)
      let values = obj[key]
      if (values && values.constructor == Array) {
        let queryValues = []
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i]
          queryValues.push(this.toQueryPair(key, value))
        }
        ret = ret.concat(queryValues)
      } else {
        ret.push(this.toQueryPair(key, values))
      }
    }
    return ret.length > 0 ? '?' + ret.join('&') : ''
  }
  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value))
  }

  private extractData(res, customMessage: boolean) {
    // let body = res.json()
    let body = res
    if (customMessage) {
      return body
    } else {
      if (body.code !== '200') {
        let reason = body.reason ? body.reason : '出错了'
        this.popSer.createMessage(reason, 'error')
        return null
      } else {
        return body.data !== '' ? body.data : true
      }
    }
    // }
  }

  private handleError(error: any) {
    this.popSer.createMessage('', 'loading', 'hide')
    let errMsg: string
    if (error instanceof Response) {
      const err = error || JSON.stringify(error)
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`
    } else {
      errMsg = error.message ? error.message : error.toString()
    }
  }


}
