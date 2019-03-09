import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/service/http-serve.service';
import global from '../../shared/global';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-get-information',
  templateUrl: './get-information.component.html',
  styleUrls: ['./get-information.component.css']
})
export class GetInformationComponent implements OnInit {
  loading=false;
  etpCer = {
    id: '',
    etpName: '',
    infoAuthNum: ''
  };
  authUrl = '';
  bodyUrl = '';
  controllerUrl = '';
  infoAuthDto = {
    status: ''
  };

  constructor(private http: HttpService, public activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
    sessionStorage.dataInit='0';
    this.getUser();
    if(global.loan.infoAuth.authUrl){
      console.log(global.loan.infoAuth)
      this.authUrl = global.loan.infoAuth.authUrl;
    }
    if(global.loan.infoAuth.bodyUrl){
      this.bodyUrl = global.loan.infoAuth.bodyUrl;
    }
    if(global.loan.infoAuth.controllerUrl){
      this.controllerUrl = global.loan.infoAuth.controllerUrl;
    }
    this.activeRoute.queryParams.subscribe(params => {
      // 从订单详情里来
      if(params['data']){
        let data=JSON.parse(params['data']);
        this.etpCer = data.etpCer;
        this.authUrl = data.authUrl;
        this.bodyUrl = data.bodyUrl;
        this.controllerUrl = data.controllerUrl;
        this.infoAuthDto = data.infoAuthDto;
      }else if(params['etpCer']&&params['infoAuth']){
        this.etpCer=JSON.parse(params['etpCer']);
        let data=JSON.parse(params['infoAuth']);
        if(!this.authUrl){
          this.authUrl = data.authUrl;
        }
        if(!this.bodyUrl){
          this.bodyUrl = data.bodyUrl;
        }
        if(!this.controllerUrl){
          this.controllerUrl = data.controllerUrl;
        }
      }else if(params['etpCer']){
        this.etpCer=JSON.parse(params['etpCer']);
      }
    });
  }

  getUser(){
    this.http.get('/v2/app/pre/users').subscribe(res => {
      global.userInfo.id=res.result.id;
    })
  }

  postInfo() {
    if (!this.authUrl) {
      alert('请上传企业信息采集授权书！')
      return;
    }
    if (!this.bodyUrl) {
      alert('请上传法人手持企业授权书！')
      return;
    }
    if (!this.controllerUrl) {
      alert('请上传大股东/实际控制人征信授权！')
      return;
    }
    this.http.post("/v2/app/pre/infoAuth", {
      etpCerId: this.etpCer.id,
      infoAuthNum: this.etpCer.infoAuthNum,
      userId: global.userInfo.id,
      etpName: this.etpCer.etpName,
      authUrl: this.authUrl,
      bodyUrl: this.bodyUrl,
      controllerUrl: this.controllerUrl
    })
      .subscribe(e => {
        if(e.code!='200'){
          alert(e.reason);
          return;
        }
        global.loan.infoAuth=e.result;
        history.back();
      })
  }

  previewImg(input, p) {
    let _this = this;
    var maxsize = 800 * 1024;//超过500k进行压缩
    //是否支持
    if (typeof FileReader === 'undefined') {
      alert("抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！");
      input.setAttribute('disabled', 'disabled');
    }
    // console.log(input.srcElement.files);
    if (input.srcElement.files && input.srcElement.files[0]) {
      this.loading=true;
      var file = input.srcElement.files[0],
        reader = new FileReader();
      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        alert('不是有效的图片文件!');
        return;
      }
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        var result = this.result;//获取到base64的图片
        // _this.imgHolder=result;
        //大于300k图片进行压缩
        let img = new Image();
        img.src = result;
        img.onload = function () {
          let imgSize=(1000*1024)/result.length;
          _this.uploadImg(_this.compress(img, imgSize, 100), p);
        }
      }
    }
  }
  uploadImg(img, p?) {
    this.http.post("/v2/app/pre/upload", { file: img }).subscribe(res => {
      if (res.code != 200) {
        return;
      }
      if (p == 'authUrl') {
        this.authUrl = res.result;
        global.loan.infoAuth.authUrl=this.authUrl;
      } else if (p == 'bodyUrl') {
        this.bodyUrl = res.result;
        global.loan.infoAuth.bodyUrl=this.bodyUrl;
      } else if (p == 'controllerUrl') {
        this.controllerUrl = res.result;
        global.loan.infoAuth.controllerUrl=this.controllerUrl;
      }
      console.log(global.loan.infoAuth)
      this.loading=false;
    })
  };

  compress(sourceImg: HTMLImageElement, scale: number, quality: number) {
    var area = sourceImg.width * sourceImg.height,//源图片的总大小
      height = sourceImg.height * scale,
      width = sourceImg.width * scale,
      compressCvs = document.createElement('canvas');//压缩的图片画布
    //压缩的图片配置宽高
    compressCvs.width = width;
    compressCvs.height = height;
    var compressCtx = compressCvs.getContext("2d");
    //解决ios 图片大于2000000像素无法用drawImage的bug
    if (area > 2000000 && navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      //瓦片绘制
      var smallCvs = document.createElement("canvas"),
        smallCtx = smallCvs.getContext("2d"),
        count = Math.ceil(area / 1000000),//分割的数量
        cvsWidth = width / count,//每个小canvas的宽度
        picWidth = sourceImg.width / count;//分割成小图片的宽度
      smallCvs.height = compressCvs.height;
      smallCvs.width = width / count;
      //拼凑成大的canvas
      for (var i = 0; i < count; i++) {
        smallCtx.drawImage(sourceImg, i * picWidth, 0, picWidth, sourceImg.height, 0, 0, cvsWidth, height);
        compressCtx.drawImage(smallCvs, i * cvsWidth, 0, cvsWidth, height);
      }
    } else {
      compressCtx.drawImage(sourceImg, 0, 0, sourceImg.width, sourceImg.height, 0, 0, width, height);
    }
    //将canvas转换成base64
    return compressCvs.toDataURL('image/jpeg', quality / 100);
  }

}
