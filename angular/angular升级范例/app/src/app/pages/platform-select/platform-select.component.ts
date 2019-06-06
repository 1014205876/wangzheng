import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/http-serve/api.service'

@Component({
  selector: 'app-platform-select',
  templateUrl: './platform-select.component.html',
  styleUrls: ['./platform-select.component.less']
})
export class PlatformSelectComponent implements OnInit {
  apps = []
  loaded = false
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAppsLink()
  }
  async getAppsLink() {
    this.loaded = false
    this.apps = await this.api.getAppsPermission()
    this.loaded = true
  }
  back() {
    history.back()
  }

}
