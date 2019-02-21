import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/service/http-serve.service';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {

  curPage = 0;

  msgList = [{ "id": "fda99943-3181-4a48-a949-90da0140e949", "createDate": "2018-09-27 21:43:05", "updateDate": "2018-09-27 21:43:05", "type": "2", "content": "您已经申请贷款成功，正在处理中，请等待客服人员联系！", "status": "0", "delFlag": "0", "userId": "109c0be4-1ede-4b65-8274-3239732f54bc", "etpName": "江西省新新美容咨询服务有限公司", "sendTime": "2018-09-27 21:43:05" }, { "id": "0016c10c-fab2-4588-9ada-e35e446f275d", "createDate": "2018-09-27 21:39:09", "updateDate": "2018-09-27 21:39:09", "type": "1", "content": "系统消息:热心市民李小猪欢迎登录博汇贷平台。", "status": "1", "delFlag": "0", "userId": "109c0be4-1ede-4b65-8274-3239732f54bc", "sendTime": "2018-09-27 21:39:09" }];

  hasMsg:any;

  list1 = [];
  list1_status = false;
  list2 = [];
  list2_status = false;
  list3 = [];
  list3_status = false;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.reload();
  }

  del(e) {
    this.http.delete('/v2/app/pre/messages/' + e.id)
      .subscribe(e => {
        this.reload();
      })
  }

  read(e) {
    this.http.put('/v2/app/pre/messages/' + e.id)
      .subscribe(e => {
        this.reload();
      })
  }

  reload() {
    this.http.get('/v2/app/pre/messages').subscribe(e => {
      this.msgList = e.result;
      this.list1 = [];
      this.list2 = [];
      this.list3 = [];
      this.list1_status = false;
      this.list2_status = false;
      this.list3_status = false;
      this.hasMsg=false;
      for(let i=0;i<e.result.length;i++){
        if(e.result[i].status == '0'){
          this.hasMsg=true;
          break;
        }
      }
      this.msgList.map(e => {
        if (e.type == '1') {
          if (e.status == '0') {
            this.list1_status = true;
          }
          this.list1.push(e);
        } else if (e.type == '2') {
          if (e.status == '0') {
            this.list2_status = true;
          }
          this.list2.push(e);
        } else if (e.type == '3') {
          if (e.status == '0') {
            this.list3_status = true;
          }
          this.list3.push(e);
        }
      })
    })
  }

}
