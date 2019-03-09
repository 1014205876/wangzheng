import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/service/http-serve.service';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.less']
})
export class RegisterSuccessComponent implements OnInit {

  constructor(
    private http: HttpService,
  ) {
  }

  imgurl='';

  ngAfterViewInit() {
    if (window.history && window.history.pushState) {
      window.addEventListener("popstate", () => {
        window.history.pushState(null, null, document.URL);
        window.history.forward();
      });
    }
    window.history.pushState(null, null, document.URL); //在初始化阶段必须得有这两行控制
    window.history.forward();
  }
  ngOnInit() {
    let that = this;
    that.http.getw('/peak-resource/v1/resource/settings?key=guestPublicNo')
      .subscribe(res => {
        console.log(res)
        that.imgurl = res.result.value
      })
  }


}
