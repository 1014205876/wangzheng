import { Component, OnInit } from '@angular/core';
import { HttpServe } from '../../../../shared/service/http-serve.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-bankcard',
  templateUrl: './bankcard.component.html',
  styleUrls: ['./bankcard.component.css']
})
export class BankcardComponent implements OnInit {

  pageNum='1'
  total='30'
  mobile=''
  data=[]
  constructor(
    private http: HttpServe,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.mobile=this.route.snapshot.queryParams.mobile
    this.getData()
  }
  getData(){
    // this.http.getCustomHeaders('kalanchoe-manager/v1/bank/user/cards?'
    // +'pageNum='+this.pageNum
    // +'&pageSize=10'
    // +'&mobile='+this.mobile).subscribe(e => {
    //   this.total=e.data.list.total
    //  this.data=e.data.list.list
    // })
  }
  pageSearch($event) {
    this.pageNum = $event;
    this.getData()
  }
}
