import { Injectable } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd'

let loading = 0

@Injectable()

export class PopSerService {
  static loading = 0
  static loadingId = null
  constructor(private message: NzMessageService, private modal: NzModalService) {
  }

  createMessage(content = '', type = 'info', operate = 'show', options: messageOptions = { nzDuration: 3000 }) {
    if (type === 'loading') {
      if (operate === 'show' && loading === 0) {
        PopSerService.loading = 1
        PopSerService.loadingId = this.message.loading(content, { nzDuration: 0 }).messageId
        
      } else if (operate === 'hide' && PopSerService.loading === 1 && PopSerService.loadingId) {
        this.message.remove(PopSerService.loadingId)
        PopSerService.loading = 0
      }
    } else {
      this.message[type](content, options)
    }
  }
  confirm(content = '', ok_callback = () => { }) {
    this.modal.confirm({
      nzTitle: content,
      nzOkText: '确定',
      nzCancelText: '取消',
      nzIconType: '',
      nzOnOk: () => {
        if (ok_callback != undefined && ok_callback != null && typeof ok_callback == 'function') {
          ok_callback()
        }
      }
    })
  }
}
export interface messageOptions {
  nzDuration: number,
  nzPauseOnHover?: boolean,
  nzAnimate?: boolean
}
