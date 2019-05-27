import { Injectable } from '@angular/core';
import resource from './resource';

@Injectable()
export class MenuItems {

    public menuLists;
    constructor() {
        this.menuLists = [
            {
                main: []
            }
        ]
        this.menuLists[0].main = resource.menu;
    }
    getAll() {
        return this.menuLists;
        // return MENUITEMS;
    }

}
