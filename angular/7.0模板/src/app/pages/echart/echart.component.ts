import { Component, OnInit } from '@angular/core';
import { MapData } from './data';
import './../../../assets/js/china.js'
declare var AMap: any;

@Component({
    selector: 'app-echart',
    templateUrl: './echart.component.html',
    styleUrls: ['./echart.component.less']
})
export class EchartComponent implements OnInit {

    constructor() {
    }
    ngOnInit() {
        this.getMap();
    }
    getMap() {
        let map = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 11,
            center: [116.397428, 39.90923]
        });
    }
}
