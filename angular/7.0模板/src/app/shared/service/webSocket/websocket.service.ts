import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class WebSocketService {
  ws: WebSocket;
  constructor() { }
  // 返回一个可观测的流，包括服务器返回的消息
  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onmessage = (res) => observer.next(res.data);  // 成功，返回数据
        this.ws.onerror = (err) => observer.error(err); // 失败
        this.ws.onclose = (over) => observer.complete(); // 完成后，要结束
      })
  }
  // 向服务器端发送消息
  sendMessage(message: any) {
    if (this.ws) {
      if (this.ws.readyState === 1) {
        this.ws.send(JSON.stringify(message));
      } else {
        console.log(this.ws.readyState)
      }
    } else {
      setTimeout(() => {
        this.ws.send(JSON.stringify(message));
      }, 1000)
    }
  }
}