import { Component, OnInit } from '@angular/core';
import global from '../../shared/global';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../shared/service/http-serve.service';
@Component({
  selector: 'app-check-etp',
  templateUrl: './check-etp.component.html',
  styleUrls: ['./check-etp.component.css']
})
export class CheckEtpComponent implements OnInit {
  list=[];
  productId;
  productName;
  etpName;
  constructor(private router: Router,private activeRoute: ActivatedRoute,private http: HttpService) {
    this.activeRoute.queryParams.subscribe(e=>{
      this.productId=e.id;
      this.productName=e.name;
      this.etpName=e.etpName;
    })
  }

  ngOnInit() {
    sessionStorage.dataInit='0';
    this.http.get('/v2/app/pre/etpCers?status=1')
    .subscribe(e=>{
      this.list=e.result;
    })
  }
  check(e){
    if(global.loan.etpCer.etpName){
      global.etpNameTemp = global.loan.etpCer.etpName;
    }
    global.loan.etpCer=e;
    // this.router.navigate(['/loan'],{queryParams: {'id': this.productId,'name':this.productName,'etpName': this.etpName}})
    history.back();
  }
  getInfo(){
  }

  info(e){
    // this.router.navigate(['/etpc-certification'],{queryParams:{'data': JSON.stringify({"busCer":{"id":"49a5ff7e-a5ba-45a2-8e24-4b127a77d605","createDate":"2018-09-27 21:40:49","updateDate":"2018-09-27 21:40:56","cerId":"f95fa49f-2e18-4802-afd0-5f5ada5ff178","etpName":"江西省新新美容咨询服务有限公司","creditCode":"911401057480908051","legalName":"李新宇","busUrl":"https://masspick-1255853614.cos-website.ap-shanghai.myqcloud.com/masspick/develop/peak-guest/591da56c-b825-43ac-ae48-2fcb327e8b87.jpg","status":"1","address":"江西省南昌市红谷港新区世贸路33号层大厦33楼","regCap":"贰仟万圆整","busTerm":"2003年05月27日至2023年05月26日","busScope":"消防设施工程、建筑智能化工程、机电设备安装工程的设计、施工及技术咨.询;电子产品的开发、销售:酒防设备、设备的械护、、电、设备、防类品、销务、用品、房、涂料、装饰材料、电线电缆、五金交电的销售.(依法须经批准的项目,经相关部门批准后方可开展经营活动)"},"idMobileCer":{"id":"0aaad214-53eb-4ff3-b9a0-97fb537b8025","createDate":"2018-09-27 21:40:49","updateDate":"2018-09-27 21:40:56","name":"李新宇","sex":"男","nation":"汉","birth":"1994/8/5","address":"江西省南昌市西湖区","idCode":"360103199408051774","issuingAgency":"上海市公安局徐汇分局","validityPeriod":"2005.10.08-2025.10.08","cerId":"f95fa49f-2e18-4802-afd0-5f5ada5ff178","idUrl":"https://masspick-1255853614.cos-website.ap-shanghai.myqcloud.com/masspick/develop/peak-guest/3537ecf8-b5ff-4c6f-8735-8b21a1e36d8d.jpg","idBackUrl":"https://masspick-1255853614.cos-website.ap-shanghai.myqcloud.com/masspick/develop/peak-guest/42ee7751-de1e-4ce7-9b61-8c036a89d38d.jpg","mobile":"13697919058","status":"1"},"bodyCer":{"id":"45608ac2-d51a-4e24-bbe9-ccbd55cf8b62","createDate":"2018-09-27 21:40:39","updateDate":"2018-09-27 21:40:39","cerId":"f95fa49f-2e18-4802-afd0-5f5ada5ff178","mediaUrl":"https://masspick-1255853614.cos-website.ap-shanghai.myqcloud.com/masspick/develop/peak-guest/e26cf27e-cec1-4cb1-bb24-9cd7fb083056.mp4","validate":"0912","status":"1"},"controllerCer":{"id":"b580e528-93c1-4e09-9475-8625a2bf62bd","createDate":"2018-09-27 21:40:49","updateDate":"2018-09-27 21:40:56","name":"李新宇","sex":"男","nation":"汉","birth":"1994/8/5","address":"江西省南昌市西湖区","idCode":"360103199408051774","issuingAgency":"上海市公安局徐汇分局","validityPeriod":"2005.10.08-2025.10.08","cerId":"f95fa49f-2e18-4802-afd0-5f5ada5ff178","idUrl":"https://masspick-1255853614.cos-website.ap-shanghai.myqcloud.com/masspick/develop/peak-guest/3537ecf8-b5ff-4c6f-8735-8b21a1e36d8d.jpg","idBackUrl":"https://masspick-1255853614.cos-website.ap-shanghai.myqcloud.com/masspick/develop/peak-guest/42ee7751-de1e-4ce7-9b61-8c036a89d38d.jpg","mobile":"13697919058","status":"1"}})}});
    this.router.navigate(['/etpc-certification'],{queryParams:{'id': e.id}});
  }
}
