import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiService } from '../../../shared/service/http-serve/api.service'

export interface TreeNodeInterface {
    key: number;
    name: string;
    age: number;
    level: number;
    expand: boolean;
    address: string;
    children?: TreeNodeInterface[];
}

@Component({
    selector: 'app-department',
    templateUrl: './department.component.html',
    styleUrls: ['./department.component.less']
})
export class DepartmentComponent implements OnInit {

    options = [{
        value: '360000',
        label: '江西省',
        children: []
    }];
    rows = [];
    department = [];
    departmentAdd = [];
    departmentEdit = [];
    typeList = [
        {
            value: '机构',
            label: '机构'
        },
        {
            value: '部门',
            label: '部门'
        }
    ]
    page = {
        total: 1,
    }
    loadingDelay = 500;

    show = false;
    loading = false;
    spinning = true
    modalStatus;
    modalTitle;
    regions = {
        province: '',
        city: '',
        area: ''
    }
    formParams = []

    public modalItems = new Items();
    addForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private message: NzMessageService,
        private api: ApiService
    ) {
        // this.reset();
    }

    ngOnInit() {

        this.getRegion()
        this.load();
        this.spinning = true
        this.dataInit();
        this.addForm = this.fb.group({
            id: [],
            parentId: [this.modalItems.parentId],
            fullName: [this.modalItems.fullName, [Validators.required]],
            shortName: [this.modalItems.shortName, [Validators.required]],
            type: [this.modalItems.type, [Validators.required]],
            region: [this.modalItems.region],
            sort: [this.modalItems.sort, [Validators.required, this.numberValidator]],
            remark: [this.modalItems.remark],
            status: [this.modalItems.status, [Validators.required]]
        })
        this.getDepartment();
        this.reset()
    }

    /**
     *递归判断是否还有子集   若没有子集加上isLeaf字段
     *
     * @param {*} data 
     * @returns
     */
    recursion(data) {
        let dataArr = []
        dataArr = data.map(item => {
            if (item.children && item.children.length > 0) {
                return {
                    value: item.id,
                    label: item.text,
                    children: this.recursion(item.children)
                }
            } else {
                return {
                    value: item.id,
                    label: item.text,
                    isLeaf: true
                }
            }
        })
        return dataArr
    }

    /**
     *所在区域选中改变时省市区赋值
     *
     * @param {*} region
     * @memberof DepartmentComponent
     */
    onChanges(region: any): void {
        if (region && region.length > 0) {
            this.regions.province = region[0]
            this.regions.city = region[1]
            this.regions.area = region[2]
        } else {
            this.regions.province = ''
            this.regions.city = ''
            this.regions.area = ''
        }
    }

    async getRegion() {
        let res = await this.api.getRegion()
        if (res) this.options[0].children = this.recursion(res)
    }

    numberValidator = (control: FormControl): { [s: string]: boolean } => {
        var reg = /^[1-9]\d{0,1}$/;
        if (!control.value) {
            return { required: true };
        } else if (control.value && (!reg.test(control.value))) {
            return { confirm: true, error: true };
        }
    }


    reset() {
        this.modalItems = new Items();
        this.modalItems.parentId = "";
        this.modalItems.status = 1;
        this.addForm.reset()
        this.addForm.get('status').setValue(1)
        this.addForm.get('parentId').setValue('')
    }
    async load() {
        let list = await this.api.getDepartment()
        if (list) {
            this.rows = [];
            this.rows = list;
            this.page.total = list.length;
            this.dataCode();
        }
    }
    async getDepartment() {
        let data = await this.api.getDepartmentNameAll()
        this.departmentAdd = data
        this.department = data
    }
    async getDepartmentEdit(id) {
        let data = await this.api.getEditDepartment(id)
        this.departmentEdit = data;
        this.department = this.departmentEdit;
    }
    modalShow(title, status, data) {
        this.modalTitle = title;
        this.modalStatus = status;
        if (status == 'add') {
            this.show = true;
        }
        if (status == 'edit') {
            this.show = true;
            for (let key in this.addForm.value) {
                this.addForm.get(key).setValue(data[key] ? data[key] : '')
            }
            if (data.parent) {
                this.modalItems.parentName = (data.parent.fullName ? data.parent.fullName : "");
            } else {
                this.modalItems.parentName = "";
            }
            this.modalItems.region = []
            if (data.province && data.province != "") {
                this.modalItems.region.push(data.province)
            }
            if (data.city && data.city != "") {
                this.modalItems.region.push(data.city)
            }
            if (data.area && data.area != "") {
                this.modalItems.region.push(data.area)
            }
            this.addForm.get('region').setValue(this.modalItems.region)
        }
        if (status == 'addChild') {
            this.addForm.get('parentId').setValue(data.id)
            this.addForm.get('status').setValue(1)
            this.modalItems.level = data.level;
            if (data.status === 0) {
                this.show = false;
                this.message.create("warning", "该部门已被禁用，此操作不可用!", { nzDuration: 3000 })
            } else {
                this.show = true;
            }
        }
    }
    modalCancel() {
        this.show = false;
        this.reset();

    }
    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.addForm.reset();
        for (const key in this.addForm.controls) {
            this.addForm.controls[key].markAsPristine();
            this.addForm.controls[key].updateValueAndValidity();
        }
    }
    submited(e) {
        let form = this.addForm.value
        this.department.forEach(item => {
            if (item.id === form.parentId) {
                form = { ...form, code: item.code }
            }
        })
        this.formParams = Object.assign(form, this.regions)
        this.formParams['parentName'] = this.modalItems.parentName

        for (const key in this.addForm.controls) {
            this.addForm.controls[key].markAsDirty();
            this.addForm.controls[key].updateValueAndValidity();
        }
        if (this.addForm.valid) {
            if (this.modalStatus == 'add') {
                this.addDepartment(e);
            }
            if (this.modalStatus == 'addChild') {
                this.addDepartment(e);
            }
            if (this.modalStatus == 'edit') {
                this.edit(e);
            }
        }

    }
    async addDepartment(e) {
        let res = this.api.addDepartment(this.formParams)
        if (res) {
            this.message.create('success', '成功!', { nzDuration: 3000 })
            this.modalCancel();
            this.resetForm(e);
            setTimeout(() => {
                this.load()
            }, 500);
        }
    }
    async edit(e) {
        let res = await this.api.editDepartment(this.formParams)
        if (res) {
            this.message.create('success', '成功!', { nzDuration: 3000 })
            this.modalCancel();
            this.resetForm(e);
            setTimeout(() => {
                this.load()
            }, 500);
        }
    }

    expandDataCache = {};
    dataRows = [];
    dataCode() {
        this.rows.forEach(item => {
            item.code = item.code.replace("0", "");
        })
        this.data2Tree(this.rows);
        this.dataInit();
        this.spinning = false
    }
    /** 获取树形根节点 */
    data2Tree(datas: any[]) {
        var dataArray = [];
        datas.forEach((data, index) => {
            if (!data.parentId) {
                data.children = [];
                data.expand = true;
                dataArray.push(data);
            }
        });
        this.dataRows = this.data2TreeDG(dataArray, datas);
    }
    /** 递归 生成树形子节点表格 */
    data2TreeDG(dataArray, datas): any[] {
        dataArray.forEach(item => {
            var dataArrayIndex = item;
            var childrenArr = []
            datas.forEach(data => {
                data.expand = data.expand;
                if (item.id == data.parentId) {
                    childrenArr.push(data)
                }
            })
            dataArrayIndex.children = childrenArr;
            if (childrenArr.length > 0) {
                this.data2TreeDG(childrenArr, datas);
            }
        })
        return dataArray;
    }
    /** 展开收缩树形节点 */
    collapse(array: any[], data, $event: boolean): void {
        if ($event === false) {
            if (data.children) {
                data.children.forEach(d => {
                    const target = array.find(a => a.code === d.code);
                    target.expand = false;
                    this.collapse(array, target, false);
                });
            } else {
                return;
            }
        }
    }
    convertTreeToList(root): TreeNodeInterface[] {
        const stack = [];
        const array = [];
        const hashMap = {};
        stack.push({ ...root, level: 0, expand: root.expand });

        while (stack.length !== 0) {
            const node = stack.pop();
            this.visitNode(node, hashMap, array);
            if (node.children) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push({ ...node.children[i], level: node.level + 1, expand: true, parent: node });
                }
            }
        }
        return array;
    }
    visitNode(node, hashMap: object, array): void {
        if (!hashMap[node.code]) {
            hashMap[node.code] = true;
            array.push(node);
        }
    }
    /** 树形表格 数据处理 */
    dataInit() {
        this.dataRows.forEach(item => {
            this.expandDataCache[item.code] = this.convertTreeToList(item);
        });
    }
    /** 开关按钮 */
    async switchange(row) {
        if (row.status == 0) {
            row.status = 1;
        } else if (row.status == 1) {
            row.status = 0;
        }
        let res = await this.api.changeDepartmentStatus(row)
        if (res) this.message.create('success', row.fullName + ' 状态修改成功!', { nzDuration: 3000 })
    }
}
class Items {
    constructor(
        public id?: String,
        public parentId?: String,
        public parentName?: String,
        public fullName?: String,
        public shortName?: String,
        public type?: String,
        public region?: any,
        public sort?: Number,
        public remark?: String,
        public status = 1,
        public code?: String,
        public level?: String
    ) { }
}