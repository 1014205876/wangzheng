import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit {

    constructor() { }
    loading = false;
    data = [
        {
            key: 1,
            status: 1,
            name: 'John Brown sr.',
            age: 60,
            address: 'New York No. 1 Lake Park',
            children: [
                {
                    key: 11,
                    status: 0,
                    name: 'John Brown',
                    age: 42,
                    address: 'New York No. 2 Lake Park'
                },
                {
                    key: 12,
                    status: 1,
                    name: 'John Brown jr.',
                    age: 30,
                    address: 'New York No. 3 Lake Park',
                    children: [{
                        key: 121,
                        status: 0,
                        name: 'Jimmy Brown',
                        age: 16,
                        address: 'New York No. 3 Lake Park'
                    }]
                },
            ]
        }
    ];
    data1 = [
        {
            key: 1,
            status: 1,
            name: 'John Brown sr12333.',
            age: 60,
            address: 'New York No. 1 Lake Park',
            children: [
                {
                    key: 11,
                    status: 0,
                    name: 'John Brown',
                    age: 42,
                    address: 'New York No. 2 Lake Park'
                },
                {
                    key: 12,
                    status: 1,
                    name: 'John Brown jr.',
                    age: 30,
                    address: 'New York No. 3 Lake Park',
                    children: [{
                        key: 121,
                        status: 0,
                        name: 'Jimmy Brown',
                        age: 16,
                        address: 'New York No. 3 Lake Park'
                    }]
                },
                {
                    key: 13,
                    status: 1,
                    name: 'Jim Green sr.',
                    age: 72,
                    address: 'London No. 1 Lake Park',
                    children: [
                        {
                            key: 131,
                            status: 0,
                            name: 'Jim Green',
                            age: 42,
                            address: 'London No. 2 Lake Park',
                            children: [
                                {
                                    key: 1311,
                                    status: 1,
                                    name: 'Jim Green jr.',
                                    age: 25,
                                    address: 'London No. 3 Lake Park'
                                },
                                {
                                    key: 1312,
                                    status: 0,
                                    name: 'Jimmy Green sr.',
                                    age: 18,
                                    address: 'London No. 4 Lake Park'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            key: 2,
            status: 1,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        }
    ];
    expandDataCache = {};

    update() {
        // this.data = this.data1
        // this.data.forEach(item => {
        //   this.expandDataCache[item.key] = this.convertTreeToList(item);
        // });
        // this.openall();
    }

    pagechange(num) {
        console.log(num)
    }

    collapse(array, data, $event: boolean): void {
        if ($event === false) {
            if (data.item.children) {
                data.item.children.forEach(d => {
                    const target = array.find(a => a.item.key === d.key);
                    target.expand = false;
                    target.loading = false;
                    this.collapse(array, target, false);
                });
            } else {
                return;
            }
        }
    }

    convertTreeToList(root: object) {
        const stack = [];
        const array = [];
        const hashMap = {};
        stack.push(
            {
                item: root,
                level: 0,
                expand: false,
                loading: false,
            }
        );

        while (stack.length !== 0) {
            const node = stack.pop();
            this.visitNode(node, hashMap, array);
            if (node.item.children) {
                for (let i = node.item.children.length - 1; i >= 0; i--) {
                    stack.push(
                        {
                            item: node.item.children[i],
                            level: node.level + 1,
                            expand: false,
                            loading: false,
                            parent: node
                        }
                    );
                }
            }
        }
        return array;
    }

    visitNode(node, hashMap: object, array): void {
        if (!hashMap[node.item.key]) {
            hashMap[node.item.key] = true;
            array.push(node);
        }
    }

    openall() {
        let that = this;
        that.fordata(that, that.data, true)
        that.forexpand(that, true)
        // that.data.forEach(item => {
        //   that.expandDataCache[item.key] = that.convertTreeToList(item);
        // });
    }
    upall() {
        let that = this;
        that.fordata(that, that.data, false)
        that.forexpand(that, false)
        // this.data.forEach(item => {
        //   that.expandDataCache[item.key] = that.convertTreeToList(item);
        // });
    }
    statuschange(list) {
        console.log(list)
        list.loading = true;
        if (list.status == 1) {
            setTimeout(() => {
                list.status = 0;
                list.loading = false;
            }, 1000);
        } else {
            setTimeout(() => {
                list.status = 1;
                list.loading = false;
            }, 1000);
        }
    }

    fordata(that, list, status) {
        for (let i = 0; i < list.length; i++) {
            list[i].expand = status
            if (!!list[i].children) {
                that.fordata(that, list[i].children, status)
            }
        }
    }

    forexpand(that, status) {
        that.data.forEach(item => {
            for (let i = 0; i < that.expandDataCache[item.key].length; i++) {
                that.expandDataCache[item.key][i].expand = status
            }
        })
    }
    conso(arr) {
        arr.forEach(item => {
            console.log(item)
        })
    }
    ngOnInit() {
        let that = this;
        this.data.forEach(item => {
            this.expandDataCache[item.key] = this.convertTreeToList(item);
        });
    }

}
export interface TreeNodeInterface {
    key: number;
    name: string;
    age: number;
    level: number;
    expand: boolean;
    loading: boolean;
    address: string;
    children?: TreeNodeInterface[];
}