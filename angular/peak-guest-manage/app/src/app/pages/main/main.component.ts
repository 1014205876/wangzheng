import { Component, OnInit } from '@angular/core';
import resource from '../../shared/app-load/resource';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: [
    './../../../assets/icon/menu/iconfont.css',
    './main.component.css'
  ]
})
export class MainComponent implements OnInit {
  
  public menu = []

  constructor() {
    this.menu = resource.menu;
  }

  ngOnInit() {
  }

  showList(e,account) {
    let arr = document.getElementsByClassName('pcodedItem')
    var arr2 = arr[e].getElementsByClassName('subItem');
    
    if(account||account==0){
      this.showMenu(arr2,account)
    }else {
      for(var i=0; i<arr2.length; i++){
        arr2[i].classList.remove('active')
      }
      this.showMenu(arr,e);
    }
    arr=null;
    arr2=null;
  }
  showMenu(arr,e){
    let length = arr[e].classList.length;
    if(arr[e].classList[length-1]=='active'){
      arr[e].classList.remove('active')
    }else{
      for(var i=0; i<arr.length; i++){
        arr[i].classList.remove('active');
      }
      arr[e].classList.add('active');
    }
  }

}
