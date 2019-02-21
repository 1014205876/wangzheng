import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { HttpService } from '../../shared/service/http-serve.service';
import global from '../../shared/global';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.css']
})
export class MineComponent implements OnInit {
  hasMsg;
  orderId;
  public headUrl='../../../assets/images/user_img_13.png';
public imgurl;


  userInfo={
    'headPort': '',
    'nickName':'',
    'mobile':''
  }

  constructor(
    private http: HttpService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cookie: CookieService
  ) {
    this.activeRoute.queryParams.subscribe(e => {
      this.orderId=e.orderId;
      if(this.orderId&&global.reload){
        console.log(this.orderId)
        this.router.navigate(['/order-lists'],{queryParams: {'orderId':this.orderId}})
      }
    })
  }

  ngOnInit() {
    let that=this;
    that.http.get('/v2/app/pre/messages').subscribe(e=>{
      that.hasMsg=false;
      for(let i=0;i<e.result.length;i++){
        if(e.result[i].status == '0'){
          that.hasMsg=true;
          break;
        }
      }
    })
    that.getUser();
    
    that.http.getw('/peak-resource/v1/resource/settings?key=guestPublicNo')
      .subscribe(res => {
        console.log(res)
        that.imgurl = res.result.value
      })
  }

  getUser(){
    this.http.get('/v2/app/pre/users').subscribe(res => {
      console.log(res.result)
      this.userInfo.nickName=res.result.nickName;
      this.userInfo.mobile=res.result.mobile;
      this.userInfo.headPort=res.result.headPort?res.result.headPort:this.headUrl;
    })
  }
  logout(){
    this.cookie.remove("Template");
    this.router.navigate(['/login']);
  }

}
