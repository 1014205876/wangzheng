import { HttpService } from './../../service/http-serve.service';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'validate-box',
  templateUrl: './validate-box.component.html',
  styleUrls: ['./validate-box.component.css']
})
export class ValidateBoxComponent implements OnInit {
  loading=false;
  //压缩后的照片
  compressSrc = '';
  //obj的holder
  newObj = new ImageInfo();

  legalNameDis = true;
  etpNameDis = true;

  //发送新的对象
  @Output() objChange = new EventEmitter();
  //识别的类型
  @Input() type = '';
  @Input() side = '';
  //要显示的图片
  @Input() img='';
  //是否显示属性值
  @Input() hasPro = true;
  //组件标题
  @Input() title = '';
  //是否校验
  @Input() validate = false;
  //是否是拍视频
  @Input() video = false;
  //上传件文本
  @Input() itemtxt = '';
  @Input()
  get obj() {
    return this.newObj;
  };
  set obj(val) {
    console.log(val)
    this.newObj = val;
    this.objChange.emit(this.obj);
  };

  constructor(private http: HttpService) { }

  ngOnInit() {

  }

  previewImg(input) {
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
          _this.compressSrc = _this.compress(img, imgSize, 100);
          _this.uploadImg(_this.compressSrc);
        }
      }
    }
  }
  uploadImg(img) {
    this.http.post("/v2/app/pre/upload", { file: img }).subscribe(res => {
      if (res.code != 200) {
        return;
      }
      let data;
      if (this.side) {
        data = { type: this.type, side: this.side, url: res.result };
      } else {
        data = { type: this.type, url: res.result };
      }
      this.http.post('/v2/app/pre/info', data)
        .subscribe(res => {
          this.loading=false;
          if(res.code!='200'){
            alert(res.reason);
            return;
          }
          this.obj = res.result;
        })
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

  reviceLegalName() {
    if (this.legalNameDis) {
      this.legalNameDis = false;
      this.etpNameDis = true;
      setTimeout(() => {
        document.getElementById("legalName").focus();
      }, 0);
    } else {
      this.legalNameDis = true;
      document.getElementById("legalName").blur();
    }
  }

  reviceEtpName() {
    if (this.etpNameDis) {
      this.legalNameDis = true;
      this.etpNameDis = false;
      setTimeout(() => {
        document.getElementById("etpName").focus();
      }, 0);
    } else {
      this.etpNameDis = true;
      document.getElementById("etpName").blur();
    }
  }
}
class ImageInfo {
  constructor(
    public status?,
  ) { }
}