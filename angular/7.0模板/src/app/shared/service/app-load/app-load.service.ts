import { Injectable } from '@angular/core';

import { ApiService } from '../api.service';
import resource from '../../resource';

@Injectable()

export class AppLoadService {
    constructor(
        private api: ApiService,
    ) { }

    //获取初始化信息
    async appLoad() {
        let cookie = await this.api.getCookie();
        if (cookie.code == 200) {
            let userInfo = await this.api.getUser({ userName: cookie.data.userName });
            if (userInfo.code == 200) {
                resource.userInfo = userInfo.data;
            }
        }
    }
}
