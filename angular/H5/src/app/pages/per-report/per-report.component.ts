import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import global from '../../shared/global';
import { HttpService } from '../../shared/service/http-serve.service';
@Component({
  selector: 'app-per-report',
  templateUrl: './per-report.component.html',
  styleUrls: ['./per-report.component.css']
})
export class PerReportComponent implements OnInit {
  loading=false;
  imgList=[];
  public pageState;
  constructor(
    private http: HttpService,
    private activatedroute: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit() {
    sessionStorage.dataInit='0';
    this.activatedroute.queryParams.subscribe(res=>{
      this.pageState=res;
      if(sessionStorage[this.pageState.key]){
        this.imgList=JSON.parse(sessionStorage[this.pageState.key])
      }
    })
  }
  previewImg(input) {
    if(this.imgList.length>=20){
      alert('最多上传20张照片')
      return;
    }
    this.loading=true;
    let _this = this;
    var maxsize = 800 * 1024;//超过500k进行压缩
    //是否支持
    if (typeof FileReader === 'undefined') {
      alert("抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！");
      input.setAttribute('disabled', 'disabled');
    }
    // console.log(input.srcElement.files);
    if (input.srcElement.files && input.srcElement.files[0]) {
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
          _this.uploadImg(_this.compress(img, imgSize, 100));
        }
      }
    }
  }
  uploadImg(img) {
    this.http.post("/v2/app/pre/upload", { file: img }).subscribe(res => {
      this.loading=false;
      this.imgList.unshift(res.result);
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
  deleteImg(e){
    this.imgList=this.imgList.filter(d=>d!= e);
  }
  sure(){
    if(this.imgList.length>0){
      sessionStorage[this.pageState.key]=JSON.stringify(this.imgList);
    }else{
      sessionStorage[this.pageState.key]="";
    }
    history.back();
  }
}
