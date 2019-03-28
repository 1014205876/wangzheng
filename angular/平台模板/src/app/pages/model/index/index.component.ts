import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

    constructor() { }

    change(e) {
        console.log(e)
        let arr = e.fileList;
        if (e.type == 'start') {
            console.log('start')
        }
        if (e.type == 'success') {
            console.log(arr)
            console.log(arr[arr.length - 1].response)
        }
    }
    get(e) {
        console.log(e)
    }
    ngOnInit() {
    }

}
