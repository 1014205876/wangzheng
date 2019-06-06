import { Injectable } from '@angular/core';

@Injectable()
export class RegularService {
    constructor() { }
    /** 手机号校验正则 */
    mobileRegular (mobile){
        return (/^[1][0-9][0-9]{9}$/.test(mobile));
    }
    /** 手机号校验正则 */
    keyRegular (key){
        return (/^[0-9a-zA-Z]+$/.test(key));
    }
    
}
