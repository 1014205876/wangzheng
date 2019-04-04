import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
    selector: 'app-back-button',
    templateUrl: './back.component.html',
    styleUrls: ['./back.component.scss'],
})
export class BackComponent implements OnInit {

    constructor(
        public nav: NavController) { }

    ngOnInit() { }
    back() {
        this.nav.back();
    }
}
