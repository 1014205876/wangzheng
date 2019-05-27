import { Injectable } from '@angular/core';
import { HttpServe } from './http-serve.service';

@Injectable()
export class TransformService {

  constructor(private http: HttpServe) { }

  /** get方法 URL拼接转换 */
  urlTransform(serverUrl, item, pageNum, pageSize): Promise<any> {
    return new Promise((resolve, reject) => {
      let itemUrl = '';
      if (item) {
        for (let key in item) {
          if (itemUrl) {
            itemUrl += "&" + key + "=" + (item[key] ? encodeURIComponent(item[key]) : '');
          } else {
            itemUrl += "?" + key + "=" + (item[key] ? encodeURIComponent(item[key]) : '');
          }
        }
      }
      var url;
      if (pageNum && pageSize) {
        url = serverUrl + itemUrl + "&pageNum=" + pageNum + "&pageSize=" + pageSize;
      } else {
        url = serverUrl + itemUrl;
      }
      this.http.get(url).then(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }
  /** 日期转换 */
  dateTransform(date: Date) {
    var dateTemp;
    var month: any = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    dateTemp = date.getFullYear() + '-' + month + '-' + date.getDate();
    return dateTemp;
  }
  /** 预约时间转换 */
  getAppoint(e) {
    return e ? (e.match(/14:00:00/) ? e.replace(/14:00:00/, 'PM') : e.replace(/08:00:00/, 'AM')) : '';
  }
  /** 结果显示转换 */
  optionsTransf(e) {
    let value = e.value;
    if (e.options && e.options.length > 0) {
      for (let i = 0; i < e.options.length; i++) {
        if (e.options[i].key == e.value) {
          value = e.options[i].value;
          break;
        }
      }
    }
    return value;
  }

}
