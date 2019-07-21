import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpServe } from 'src/app/shared/service/http-serve.service'

import Swiper from 'swiper'

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.less']
})
export class FormComponent implements OnInit {
    @ViewChild("appCode") changeCode;

    constructor(
        private http: HttpServe
    ) { }
    alert = false;

    find = {
        name: '',
        status: '',
        tel: '',
        pageNum: 1,
        pageSize: 10.
    }

    form = {
        name: '',
        id: '',
        status: 0,
        tel: '',
        value: ''
    }

    table = [];

    abc;

    changeAbc() {
        setTimeout(() => {
            this.abc = Math.floor(Math.random() * (4 - 666) + 300) + '';
            console.log(this.abc);
            this.changeCode.drawPic(this.abc)
        }, 200)
    }

    showAlert(type, item) {
        this.alert = true;
        if (type == 'add') {
        }
        if (type == 'change') {
            this.form.name = item.name;
            this.form.id = item.id;
            this.form.status = item.status;
            this.form.tel = item.tel;
            this.form.value = item.value;
        }
    }

    changeTable() {
        this.http.put(
            'api/form',
            this.form
        ).then((res) => {
            if (res.code == 200) {
                console.log(res);
                this.close();
                this.getTable();
            } else {
                console.log(res.reason)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    remove(id) {
        this.http.delete(
            'api/form',
            {
                id: id
            }
        ).then((res) => {
            if (res.code == 200) {
                this.getTable();
            } else {
                console.log(res.reason)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    close() {
        this.alert = false;
        this.form.name = '';
        this.form.status = 0;
        this.form.tel = '';
        this.form.value = '';
    }
    getTable() {
        this.http.get(
            'api/form',
            this.find
        ).then((res) => {
            if (res.code == 200) {
                this.table = res.data;
            } else {
                console.log(res.reason)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    reset() {
        this.find.name = '';
        this.find.status = '';
        this.find.tel = '';
    }

    addTable() {
        this.http.post('api/form',
            {
                name: this.form.name,
                status: this.form.status,
                tel: this.form.tel,
                value: this.form.value
            }
        ).then((res) => {
            console.log(res)
            this.alert = false;
            this.getTable();
        }).catch((err) => {
            console.log(err)
        })
    }
    a = [[1, 2], [3], [3, 4, [5, 6, [7, 8]]]];
    arr = [];
    chaifen(arr) {
        arr.forEach((item) => {
            // if (typeof (item) == 'object') {
            if (item.length) {
                this.chaifen(item);
            } else {
                this.arr.push(item);
            }
        })
    }

    ngOnInit() {
        // this.getTable();
        this.chaifen(this.a);
        this.changeAbc();
        console.log(this.arr);
let that=this
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: true,//可选选项，自动滑动
            pagination: {
                el: '.swiper-pagination',
            // bulletClass : 'my-bullet',//需设置.my-bullet样式
              },
            on: {
                touchStart (event) {
                    console.log(that.find)
                    console.log(this)
                },
            },
        })
    }
}
