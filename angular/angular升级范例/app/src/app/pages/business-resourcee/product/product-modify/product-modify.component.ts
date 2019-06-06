import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../../shared/service/http-serve/api.service';

@Component({
    selector: 'app-product-modify',
    templateUrl: './product-modify.component.html',
    styleUrls: ['./product-modify.component.less']
})
export class ProductModifyComponent implements OnInit {


    public id;
    public applyRepayMethods = [];/** 还款方式 */
    public RepayMethodValid = true;
    productTypes = [];/** 产品类型数据 */
    productProviders = [];/** 产品提供方数据 */

    formatterPercent = value => `${value} %`;
    parserPercent = value => value.replace(' %', '');

    // 表单字段
    baseDetForm: FormGroup; /** 产品基本信息  */

    items = {
        "product": {
            "name": "",
            "number": "",
            "minTerm": null,
            "maxTerm": null,
            "minAmount": null,
            "maxAmount": null,
            "minRate": null,
            "maxRate": null,
            /** 支持还款方式数组 */
            "repayMethod": '',
            "productType": 'guaranteeClass',//产品类型
            "remark": "",
            "status": null,
            /** 产品介绍 */
            "productIntroduction": "",
            /** 产品提供方 */
            "productProvider": "",
        }
    }

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private fb: FormBuilder,
        private message: NzMessageService
    ) {
        this.id = this.route.snapshot.queryParams.id;
        /** 服务费支付方式数据 */
        this.api.getProductItem().then(res => {
            this.productTypes = res.productType;
            this.productProviders = res.productProvider;
            this.applyRepayMethods = res.applyRepayMethod;
            this.getProduct();
        })
    }
    ngOnInit() {
        this.baseDetForm = this.fb.group({
            name: [this.items.product.name, [Validators.required]],
            number: [this.items.product.number, [Validators.required]],
            minTerm: [this.items.product.minTerm, [Validators.required]],
            maxTerm: [this.items.product.maxTerm, [Validators.required]],
            minAmount: [this.items.product.minAmount, [Validators.required]],
            maxAmount: [this.items.product.maxAmount, [Validators.required]],
            minRate: [this.items.product.minRate, [Validators.required]],
            maxRate: [this.items.product.maxRate, [Validators.required]],
            productType: [this.items.product.productType, [Validators.required]],
            productProvider: [this.items.product.productProvider],
            productIntroduction: [this.items.product.productIntroduction],
            remark: [this.items.product.remark],
            repayMethod: [this.items.product.repayMethod],
            status: [this.items.product.status, [Validators.required]]
        });
    }

    /** 获取产品的所有信息 */
    getProduct() {
        this.api.getProduct(this.id).then(res => {
            this.items.product = res;
            /** 产品的基本信息  */
            let productItems = res;
            this.items.product.status = String(productItems.status);
            /** 在富文本数组前方添加一组数据 */
            this.items.product.productIntroduction = productItems.productIntroduction;
            /** 复现所有选中的还款方式checkbox */
            let checkedRepayMethod = productItems.repayMethod.split(",")
            this.applyRepayMethods = this.applyRepayMethods.map(item => {
                return {
                    code: item.code,
                    name: item.name,
                    checked: false,
                }
            });
            for (let i = 0; i < checkedRepayMethod.length; i++) {
                for (let j = 0; j < this.applyRepayMethods.length; j++) {
                    if (checkedRepayMethod[i] == this.applyRepayMethods[j].code) {
                        this.applyRepayMethods[j].checked = true;
                    }
                }
            }
            for (let key in this.baseDetForm.value) {
                this.baseDetForm.get(key).setValue(this.items.product[key])
            }
        })
    }
    /** 富文本输入内容导入 */
    keyupHandler1(e, list) {
        list.productIntroduction = e
    }
    /** 选择还款方式 */
    checkRepayMethod(e) {
        this.RepayMethodValid = false;
        if (e && e.length > 0) {
            this.items.product.repayMethod = e.join(',');
        } else {
            this.items.product.repayMethod = '';
        }
    }
    /** 返回 */
    goBack() {
        history.go(-1);
    }
    addProduct() {
        let isProductFormValid = true;

        for (const key in this.baseDetForm.controls) {
            this.baseDetForm.controls[key].markAsDirty();
            this.baseDetForm.controls[key].updateValueAndValidity();
        }
        if (this.items.product.minTerm > this.items.product.maxTerm) {
            isProductFormValid = false;
            return;
            // this.message.create('warning','贷款期限最小范围不可大于最大范围！',{ nzDuration: 3000 });
        } else if (this.items.product.minAmount > this.items.product.maxAmount) {
            isProductFormValid = false;
            return;
            // this.message.create('warning','贷款金额最小范围不可大于最大范围！',{ nzDuration: 3000 });
        } else if (this.items.product.minRate > this.items.product.maxRate) {
            isProductFormValid = false;
            return;
            // this.message.create('warning','综合费率最小范围不可大于最大范围！',{ nzDuration: 3000 });
        }
        /** 支持还款方式复选框转字符串 */
        this.items.product.repayMethod = '';
        for (let i = 0; i < this.applyRepayMethods.length; i++) {
            if (this.applyRepayMethods[i].checked) {
                if (this.items.product.repayMethod) {
                    this.items.product.repayMethod += "," + this.applyRepayMethods[i].code;
                } else {
                    this.items.product.repayMethod += this.applyRepayMethods[i].code;
                }
            }
        }
        if (!this.items.product.repayMethod) {
            this.RepayMethodValid = false;
        } else {
            this.RepayMethodValid = true;
        }
        this.baseDetForm.get('remark').setValue(this.items.product.remark)
        this.baseDetForm.get('productIntroduction').setValue(this.items.product.productIntroduction)
        this.baseDetForm.get('repayMethod').setValue(this.items.product.repayMethod)
        let data = {
            product: this.baseDetForm.value
        }
        if (this.baseDetForm.valid && isProductFormValid && this.RepayMethodValid) {
            this.api.editProduct(this.id, data).then(res => {
                if (res) {
                    this.message.create('success', "成功", { nzDuration: 3000 })
                    this.goBack();
                }
            })
        }
    }

}