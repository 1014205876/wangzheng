import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/service/http-serve.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  hasMsg = true;
  data = {
    id: '',
    infor: {
      createDate: "2018-12-06 17:13:03",
      detail: "<p>１</p>",
      id: "87108a5a-031e-498a-9535-d15673bd3afa",
      mediaUrl: "http://image-.png",
      sort: 2,
      status: 1,
      title: "１",
      updateDate: "2018-12-10 16:35:26",
    }
  }
  constructor(
    private http: HttpService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let that = this;
    that.route.params.subscribe(function (data) {
      that.data.id = data.id
    })
    this.http.get(
      '/v2/app/pre/banners/' + that.data.id
    )
      .subscribe(res => {
        console.log(res)
        that.data.infor = res.result
      })
  }

}
