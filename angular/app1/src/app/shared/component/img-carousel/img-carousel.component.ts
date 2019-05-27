import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'img-carousel',
    templateUrl: './img-carousel.component.html',
    styleUrls: ['./img-carousel.component.less']
})
export class ImgCarouselComponent implements OnInit {

    effect = 'fade';
    @Input() urlLists;

    constructor() { }

    ngOnInit() {
        console.log(this.urlLists)
    }

}
