import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../shared/service/http-serve.service';
import { AuthService } from '../../shared/service/auth.service';
import global from '../../shared/global';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

    product;
    productIntroduction;
    pageState;

    constructor(
        private activeRoute: ActivatedRoute,
        private router: Router,
        private http: HttpService,
        private auth: AuthService,
    ) {
        this.activeRoute.queryParams.subscribe(e => {
            this.pageState = e;
        })
    }

    ngOnInit() {
        this.getProduct();
    }

    getProduct() {
        this.http.get('/v2/app/pre/products').subscribe(res => {
            this.product = res.result[0];
        })
    }

    sure() {
        if (this.auth.getAuthorization("Template")) {
            sessionStorage.dataInit = '1';
            this.resetGlobal();
            this.router.navigate(['/loan'], { queryParams: { 'id': this.product.id, 'name': this.product.name } })
        } else {
            setTimeout(()=>{

            this.router.navigate(['/login']);
            },2000)
            alert('对不起您还未登录，请先登录！')
        }
    }

    resetGlobal() {
        global.loan = {
            productId: "",
            productName: "",
            etpCer: {
                id: '',
                etpName: '',
                infoAuthNum: ''
            },
            amount: null,
            term: null,
            infoAuth: {
                id: '',
                infoAuthNum: '',
                authUrl: '',
                bodyUrl: '',
                controllerUrl: ''
            },
            repayMethod: "",
            stepSwitch: false
        }
    }

}
