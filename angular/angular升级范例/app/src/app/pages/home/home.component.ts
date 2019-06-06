import { Component, OnInit } from '@angular/core';
import resource from '../../layout/menu-items/resource'
import { ApiService } from '../../shared/service/http-serve/api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  userInfo = resource.currentUser
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getUserInfo()
  }
  async getUserInfo() {
    if (resource.currentUser) {
      let res = await this.api.getUserInfo(resource.currentUser.id)
      this.userInfo = res
    } else {
      setTimeout(() => {
        this.getUserInfo()
      }, 500);
    }
  }
  resolveRoleName(str) {
    if (str && str.length > 0) {
      return str.join(' | ')
    }

  }

}
