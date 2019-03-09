import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/service/http-serve.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-help-details',
  templateUrl: './help-details.component.html',
  styleUrls: ['./help-details.component.css']
})
export class HelpDetailsComponent implements OnInit {
  mengbanshow = false;
  tel = 1234567;
  id = '';
  pageState;
  solve() {
    console.log('已解决')
    this.http.patch(
      '/v2/app/pre/helps/' + this.id,
      {
        "type": "solved"
      }
    )
      .subscribe(res => {
        console.log(res)
      })
      history.go(-1);
  }
  nosolve() {
    console.log('未解决')
    this.http.patch(
      '/v2/app/pre/helps/' + this.id,
      {
        "type": "unSolved"
      }
    )
      .subscribe(res => {
        console.log(res)
      })
  }
  show() {
    this.mengbanshow = true;
  }
  hidden() {
    this.mengbanshow = false;
  }
  constructor(
    private activeRoute: ActivatedRoute,
    private http: HttpService,
    private route: ActivatedRoute,
  ) {
    this.activeRoute.queryParams.subscribe(e => {
      this.pageState = e;
    })
  }

  ngOnInit() {
    let that = this;
    that.route.params.subscribe(function (data) {
      that.id = data.id
      that.http.get(
        '/v2/app/pre/helps/' + that.id
      )
        .subscribe(res => {
          console.log(res)
          that.pageState = res.result;
        })
    })
    that.http.getw('/peak-resource/v1/resource/settings?key=serviceTel')
      .subscribe(res => {
        console.log(res)
        that.tel = res.result.value;
      })

  }

}
