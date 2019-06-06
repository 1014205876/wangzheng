import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ApiService } from './../../../../shared/service/http-serve/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observer,Observable } from 'rxjs';
import { RegularService } from '../../../../shared/service/regular/regular.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'app-product',
    templateUrl: './product-material.component.html',
    styleUrls: ['./product-material.component.less']
})
export class ProductMaterialComponent implements OnInit {

    /** 列表title */
    title = "";
    id = "";

    /** 查询字段 */
    public searchItems;

    // 表单字段
    public modalItems;
    addForm: FormGroup;
    // 修改字段id
    rowId;

    // 弹窗展示字段
    show = false;
    modalStatus = "edit";
    modalTitle;

    //file框文件的上传配置
    uploader: FileUploader = new FileUploader({
        url: "/upload",
        method: "post",
        itemAlias: "file",
        autoUpload: false
    });

    /** 表格数据 */
    rows = [];
    page = {
        "total": 1,         /** 总条数 */
        "totalPage": 1,     /** 总页数 */
        "pageNum": 1,        /** 当前页码 */
        "pageSize": 10      /** 每页展示多少条数据 */
    }
    loadingDelay = 500;
    loading = false;
    spinning = true

    constructor(
        private route: ActivatedRoute,
        private regular: RegularService,
        private api: ApiService,
        private fb: FormBuilder,
        private message: NzMessageService,
        private modalService: NzModalService
    ) {
        this.id = this.route.snapshot.queryParams.id;
        this.title = this.route.snapshot.queryParams.name;
        this.modalItems = new Group();
        this.addForm = this.fb.group({
            key: [this.modalItems.key, [Validators.required], [this.keyValidator]],
            name: [this.modalItems.name, [Validators.required]],
            enclosureUrl: [this.modalItems.enclosureUrl],
            value: [this.modalItems.value, [Validators.required]]
        });
        this.reset();
        this.search(this.page.pageNum);
    }

    ngOnInit() {
    }
    /** 配置key校验 */
    keyValidator = (control: FormControl) => new Observable((observer: Observer<any>) => {
        setTimeout(() => {
            if (control.value && !(this.regular.keyRegular(control.value))) {
                observer.next({ error: true, duplicated: true });
            } else {
                observer.next(null);
            }
            observer.complete();
        }, 1000);
    })
    /** 查询 */
    async search(e) {
        this.page.pageNum = e
        let params = {
            name: this.searchItems.name ? this.searchItems.name : "",
            key: this.searchItems.key ? this.searchItems.key : "",
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize
        }
        let res = await this.api.getSysProductMaterial(this.id, params)
        this.rows = []
        this.rows = res.list;
        this.page.total = res.total;
        this.page.totalPage = res.pages;
        this.spinning = false
    }
    /** 翻页 */
    changePage(e) {
        this.search(e);
    }
    /** 初始化查询和弹窗变量 */
    reset() {
        this.searchItems = new Items();
        this.modalItems = new Group();
    }

    //富文本输入内容导入
    keyupHandler(e) {
        this.addForm.get('value').setValue(e);
    }
    //file框选择文件时触发
    selectedFileOnChanged(e, list) {
        this.uploader.queue[0].upload();//传送文件
        this.uploader.queue[0].onSuccess = (response, status, headers) => {
            this.uploader.clearQueue();//清除文件
            if (status == 200) {
                list = JSON.parse(response).location;
                this.addForm.get('enclosureUrl').setValue(list);
            } else {
                this.message.create("error", "上传失败", { nzDuration: 3000 })
            }
        }
    }

    // 弹窗展示
    modalShow(title, data) {
        this.reset();
        this.show = true;
        this.modalStatus = title;
        if (title == 'add') {
            this.modalTitle = '新增配置';
        }
        if (title == 'edit') {
            this.modalTitle = "编辑配置";
            this.rowId = data.id;
            this.addForm.get('name').setValue(data.name ? data.name : '');
            this.addForm.get('key').setValue(data.key ? data.key : '');
            this.addForm.get('enclosureUrl').setValue(data.enclosureUrl ? data.enclosureUrl : '');
            this.addForm.get('value').setValue(data.value ? data.value : '');
        }
    }
    // 关闭弹窗
    modalCancel() {
        this.show = false;
        this.reset();
        this.search(this.page.pageNum);
        this.addForm.reset();
    }

    // 弹窗 确定提交
    submited(e) {
        let valid = this.addForm.valid;
        let data = {
            "productId": this.id,
            "name": (this.addForm.value.name ? this.addForm.value.name : ''),
            "key": (this.addForm.value.key ? this.addForm.value.key : ''),
            "value": (this.addForm.value.value ? this.addForm.value.value : ''),
            "seq": 0,
            "enclosureUrl": (this.addForm.value.enclosureUrl ? this.addForm.value.enclosureUrl : '')
        };
        for (const key in this.addForm.controls) {
            if (!this.addForm.value[key]) {
                this.addForm.controls[key].markAsDirty();
                this.addForm.controls[key].updateValueAndValidity();
            }
        }
        if (valid) {
            this.loading = true;
            if (this.modalStatus == 'add') {
                this.add(data);
            }
            if (this.modalStatus == 'edit') {
                this.edit(data);
            }
        }
    }

    // 添加扩展配置
    async add(data) {
        let res = await this.api.addSysProductMaterial(data)
        this.loading = false;
        if (res) {
            this.show = false;
            this.message.create("success", "添加成功", { nzDuration: 3000 })
        }
        this.reset();
        this.addForm.reset();
        this.search(1);
    }

    //修改配置项
    async edit(data) {
        let res = await this.api.editSysProductMaterial(this.rowId, data)
        this.loading = false;
        if (res) {
            this.show = false;
            this.message.create("success", "修改成功", { nzDuration: 3000 })
        }
        this.reset();
        this.addForm.reset();
        this.search(this.page.pageNum);//重新调取后台表格数据
    }

    /** 删除确认提示框 */
    showDeleteConfirm(data): void {
        this.modalService.confirm({
            nzTitle: '删除提示',
            nzContent: '<b style="color: red;">您正在删除配置项，删除后可能影响调用此参数的程序运行，你还要继续吗？</b>',
            nzOkText: '确定',
            nzOkType: 'danger',
            nzOnOk: () => this.delete(data),
            nzCancelText: '取消',
            nzOnCancel: () => { }
        });
    }
    //删除配置项
    async delete(data) {
        let res = await this.api.deleteSysProductMaterial(data.id)
        if (res) {
            this.message.create("success", "删除成功", { nzDuration: 3000 })
        }
        this.reset();
        this.search(this.page.pageNum);//重新调取后台表格数据
    }

}
class Items {
    constructor(
        public name?: string,
        public number?: string
    ) { }
}
class Group {
    constructor(
        public name?: String,
        public key?: String,
        public value?: any,
        public enclosureUrl?: any
    ) { }
}