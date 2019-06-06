import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  theme = 'dark'
  lastTheme = 'light'
  constructor() { }

  ngOnInit() {
    this.changeTheme()
  }
  changeTheme() {

    let $layout = document.getElementById('layout')
    let className = $layout.className
    className = className.replace(this.lastTheme + '-theme', '')
    $layout.className = className + ' ' + this.theme + '-theme'
    this.lastTheme = this.theme
    this.theme = this.theme === 'dark' ? 'light' : 'dark'
  }

}
