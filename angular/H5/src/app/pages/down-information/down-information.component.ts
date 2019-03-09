import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from './../../shared/service/http-serve.service';

@Component({
  selector: 'app-down-information',
  templateUrl: './down-information.component.html',
  styleUrls: ['./down-information.component.css']
})
export class DownInformationComponent implements OnInit {

  currentTab=0;
  infoAuthNum;
  modalHidden=false;
  email;

  constructor(private http: HttpService, public activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(e => {
      this.infoAuthNum=e.infoAuthNum;
    })
  }

  ngOnInit() {
  }

  swichNav(e){
    this.currentTab=e.target.id;
  }
  sendMail(){
    if (!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.email))) {
      alert('请输入邮箱');
      return;
    }
    var value={
      "email": this.email,
      "type": "auth",
      "infoAuthNum": this.infoAuthNum
    }
    this.http.post('/v2/app/pre/email',value).subscribe(res => {
      console.log(res)
      this.modalHidden=false;
      if(res.code=='200'){
        alert("邮件已发送，请注意查收");
      }else{
        alert(res.reason)
      }
    })
  }

}
