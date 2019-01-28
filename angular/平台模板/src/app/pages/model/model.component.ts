import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let arr1 = [12, 1, 14]
    let arr2 = [
      { name: "6", age: 1 },
      { name: "3", age: 1 },
      { name: "3", age: 4 },
      { name: "6", age: 4 },
      { name: "小红", age: 2 },
      { name: "小花", age: 2 },
      { name: "小明", age: 8 },
      { name: "小红", age: 8 },
      { name: "小花", age: 9 },
      { name: "小花", age: 9 },
    ]
    function sortRule(a, b) {
      return a - b; // 如果a>=b，返回自然数，不用交换位置
    }
    arr1.sort(sortRule);
    function sortBy(field1, field2) {
      return function (a, b) {
        if (a[field1] == b[field1]) {
          return a[field2] - b[field2]
        } else {
          return a[field1] - b[field1];
        }
      }
    }
    arr2.sort(sortBy("age", "name"));
    console.log(arr1)
    console.log(arr2)
  }

}
