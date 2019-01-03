import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import resource from '../../layout/menu-items/resource';
import { HttpServe } from '../../layout/service/http-serve.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  nav:any={};
  nowindex:number;
  constructor(
    private http: HttpServe,
  ) { }
  openChange(index:number){
    this.nowindex=index;
  }
  ngOnInit() {
    //左导航栏导航
    this.http.getCustomHeaders("/peak-resource/api/resource/user/permission").subscribe(res => {
      console.log(res);
      this.nav = res.result
      resource.ResourceItems = res.result.resource;
      resource.menu = res.result.menu;
    })
  }

}
