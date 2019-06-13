import { Http } from '@angular/http';
import { HttpService } from './../../../shared/service/http-serve.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import status from '../../../shared/status';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {
  public imgUrl;
  public active = false;
  public baseUrl = 'http://192.168.111.212:6200/';

  //建议的文本内容
  public agreement: String = '';

  //单独选择的某行对象
  public item;

  public totalPage;

  public mask = false;
  public flagS;
  public flagSure = false;

  public authorizeSearch;
  public rows = [];


  public selected = [];
  public selectDate = [];


  constructor(private http: HttpService, private router: Router, ) {
    this.authorizeSearch = new AuthorizeSearch();
  }

  ngOnInit() {
    this.authorizeSearch.status = '0';
    this.search(1);
  }

  // 图片放大
  imgScale(url) {
    this.imgUrl = url;
    this.active = true;
  }
  //关闭
  close(e){
    this.active = e;
  }

  search(e) {
    this.http.getCustomHeaders(
      "/v1/app/back/infoAuthsGrid?"
      + "regMobile=" + encodeURIComponent(this.authorizeSearch.regMobile ? this.authorizeSearch.regMobile : '')
      + "&etpName="+encodeURIComponent(this.authorizeSearch.etpName ? this.authorizeSearch.etpName : '')
      + '&pageNum=' + (e ? e : '1') + '&pageSize=10'
    ).subscribe(res => {
      var data = res.result.list;
      // var ipos = data[0].authUrl.indexOf('static');
      // for(var i = 0; i<data.length; i++) {
      //   data[i].authUrl = this.baseUrl + data[i].authUrl.substr(ipos).replace(/\\/g,'/');
      //   data[i].bodyUrl = this.baseUrl + data[i].bodyUrl.substr(ipos).replace(/\\/g,'/');
      //   data[i].controllerAuthUrl = this.baseUrl + data[i].controllerAuthUrl.substr(ipos).replace(/\\/g,'/');
      // }
      this.rows = data;
      this.totalPage = res.result.navigatepageNums.length;
    });
  }

  changePage(e) {
    this.search(e);
  }

  onSelect(selected) {
    this.selectDate = selected.selected;
  }
  simpSelect(row, flag) {
    if (row.length != 0) {
      this.flagS = flag;
      this.selectDate = [row];
    } else if (row.length == 0) {
      if (this.selectDate.length == 0) {
        this.flagS = 'N';
      } else {
        var temp = 0;
        for (var i = 0; i < this.selectDate.length; i++) {
          if (this.selectDate[i].status != '0') {
            temp = temp + 1;
          }
        }
        if (temp > 0) {
          this.flagS = 'R';
        } else {
          this.flagS = flag;
        }
      }
    }
  }
  remove() {
    this.selectDate = [];
  }

  approvePass(flag) {
    for (var i = 0; i < this.selectDate.length; i++) {
      this.passResult(this.selectDate[i], this.selectDate[i].status, flag);
    }
    this.remove();
  }

  passResult(id, status, flag) {
    if ((flag == 'T')) {
      this.http.putCustomHeaders('/v1/app/back/auth/info/' + id.id + '/pass?comments=' + this.agreement, id)
        .subscribe(res => {
          var result = res.result;
          if (result == 1) {
            this.search(1);
          }
        });
    } else if ((flag == 'F')) {
      this.http.putCustomHeaders('/v1/app/back/auth/info/' + id.id + '/noPass?comments=' + this.agreement, id)
        .subscribe(res => {
          var result = res.result;
          if (result == 1) {
            this.search(1);
          }
        });
    };
    this.agreement = '';
    this.item = '';
  }
  checkBtn(row) {
    status.authorizeItem = row;
    this.router.navigate(['/app/business/authorizeinfo']);
  }
}
class AuthorizeSearch {
  constructor(
    public etpName?: String,          //企业名称
    public nickName?: String,         //微信昵称
    public no?: String,               //授权书编号
    public bookUrl?: String,          //授权书上传照
    public bodyUrl?: String,          //法人手持照
    public createDate?: Date,         //上传时间
    public status?: String            //状态    0 未审核   1 通过    2 审核失败
  ) { }
}

class onSelect { }
class approvePass { }
