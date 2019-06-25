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
  /** 
   * 时间格式化函数
   * fmt为输出的时间格式（yyyy-MM-dd hh:mm:ss）或（yyyy-MM-dd 00:00:00）
   * date为输入的时间对象（new Date()）
  */
  timeFormat(fmt, date) {
      var o = {
          "M+": date.getMonth() + 1,                      //月份   
          "d+": date.getDate(),                           //日   
          "h+": date.getHours(),                          //小时   
          "m+": date.getMinutes(),                        //分   
          "s+": date.getSeconds(),                        //秒   
          "q+": Math.floor((date.getMonth() + 3) / 3),    //季度   
          "S": date.getMilliseconds()                     //毫秒   
      };
      if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
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
