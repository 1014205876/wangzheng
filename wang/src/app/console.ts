import { Injectable } from '@angular/core';

@Injectable()
export class Consol {
    constructor() { }
    debug(msg: string) {
        console.log(msg)
    }
}
