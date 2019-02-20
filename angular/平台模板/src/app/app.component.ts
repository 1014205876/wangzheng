import { Component } from '@angular/core';

@Component({
  selector: 'app-root',//声明组件标签
  templateUrl: './app.component.html',//调用组件html文件
  styleUrls: ['./app.component.css'],//调用组件css文件
  // template: `
  // <app-admin></app-admin>
  // <div class="red">123</div>
  // `,
  // styles: [
  //   `
  //     .red{
  //       color:white;
  //       background:blue;
  //     }
  //   `,
  //   `
  //     .red{
  //       background:red;
  //     }
  //   `
  // ]
})
export class AppComponent {
  title = 'app';
}
