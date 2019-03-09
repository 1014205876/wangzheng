import { Component, OnInit, HostListener, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'msg-item',
  templateUrl: './msg-item.component.html',
  styleUrls: ['./msg-item.component.css']
})
export class MsgItemComponent implements OnInit {
  private startX;
  txtStyle;
  private delBtnWidth=320;
  @Input() obj;
  @Output() del=new EventEmitter();
  @Output() readed=new EventEmitter();
  constructor() { }
  @HostListener('window:click')
  onClick(){
    this.txtStyle= 0
  }
  ngOnInit() {
  }

  delItem() {
    this.del.emit();
  }
  read () {
    this.readed.emit();
  }
  reading(e){
    alert(e);
    this.readed.emit();
  }
  touchS(e){
    if (e.touches.length == 1) {
      //设置触摸起始点水平方向位置
      this.startX=e.touches[0].clientX;
    }
  }

  touchM(e){
    if(this.txtStyle== -this.delBtnWidth){
      return;
    }
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.startX - moveX;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        this.txtStyle= 0
      } else if(disX >= this.delBtnWidth){
        this.txtStyle= -this.delBtnWidth;
      }
      else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        this.txtStyle= -disX;
      }
    }
  }

  touchE(e){
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.startX - endX;
      var delBtnWidth = this.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      if (disX > (delBtnWidth / 3)) {
        this.txtStyle= -delBtnWidth
      } else {
        this.txtStyle= 0
      }
    }
  }
}
