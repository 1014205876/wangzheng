import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import global from "../../shared/global";

@Component({
  selector: 'app-form-child',
  templateUrl: './form-child.component.html',
  styleUrls: ['./form-child.component.css']
})
export class FormChildComponent implements OnInit {

  loading = false;

  config;
  ItemConfig;

  constructor(private activatedroute: ActivatedRoute) {
    this.activatedroute.queryParams.subscribe(res => {
      this.config = JSON.parse(res.config)
      this.ItemConfig = this.config.controlList;
    })
  }

  ngOnInit() {
    console.log(sessionStorage)
    sessionStorage.dataInit = '0';
  }

  submitted(form) {
    if(!global.loan.stepSwitch){
      let cansubmit = true;
      console.log(form)
      let config = this.config;
      for (let j = 0; j < config.controlList.length; j++) {
        if (config.controlList[j].require == '1') {
          if (config.controlList[j].value) {
            console.log('该项填写完毕')
          } else {
            cansubmit = false;
            alert(config.controlList[j].label + ' 不得为空')
            return;
          }
        }
      }
      console.log(sessionStorage)
      if (cansubmit) {
        sessionStorage.dataInit = '0';
        window.history.back()
      }
    }
    global.loan.stepSwitch=false;
  }
}
