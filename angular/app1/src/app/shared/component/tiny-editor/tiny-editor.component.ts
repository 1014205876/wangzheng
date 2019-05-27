import {
  Component,
  AfterViewInit,
  EventEmitter,
  OnDestroy,
  Input,
  Output
} from '@angular/core';

import 'tinymce';
import 'tinymce/themes/silver/theme';
import 'tinymce/plugins/link';//链接
import 'tinymce/plugins/image';//图片
import 'tinymce/plugins/table';//表格
import 'tinymce/plugins/preview';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';//全屏
import 'tinymce/plugins/toc';//目录
import 'tinymce/plugins/help';//帮助
import 'tinymce/plugins/textcolor';//文本颜色
import "../../../../assets/zh_CN.js";
import { Http, Headers } from '@angular/http';
import { HttpHandler } from '@angular/common/http';

declare var tinymce: any;

@Component({
  selector: 'app-tiny-editor',
  template: `<textarea id="{{elementId}}"></textarea>`  // 最好不要这么干，其实无所谓了，因为 这就是个空架子
})
export class TinyEditorComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: string;
  @Input() initialContent: string
  @Output() onEditorContentChange = new EventEmitter();
  editor;
  constructor(
    private http: Http,
  ) { }
  uploadFile(url: string, formData: any) {
    var that = this;
    var headers = new Headers();
    headers.set('accept', 'application/json');
    return this.http.post(url, formData, { headers: headers });
  }
  ngOnChanges() {
    console.log(this.editor)
    if (this.editor) {
      if (this.initialContent && this.initialContent.length > 0) {
        let content = this.initialContent
        this.editor.setContent(content)
      } else {
        this.editor.setContent('')
      }
    }
  }
  ngAfterViewInit() {
    let that = this;
    tinymce.init({
      selector: '#' + this.elementId,       // id 属性绑定在父组件上
      plugins: ['link', 'table', 'image', 'preview', 'code', 'fullscreen', 'toc', 'help', 'textcolor'],
      toolbar: [
        "undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify alignnone | outdent indent | link image",
        "fontselect fontsizeselect forecolor backcolor cut copy paste subscript superscript",
        "pagebreak spellchecker searchreplace visualblocks  visualchars code help fullscreen",
      ],
      // textcolor_cols: "5",//颜色选择器的宽度
      content_css: '../../../../assets/skins/content/default/content.css',
      skin_url: '../../../../assets/skins/ui/oxide',   // 这里是刚才移动的主题文件
      theme: 'silver',
      branding: false,
      setup: (editor) => {
        this.editor = editor;
        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.onEditorContentChange.emit(content);   // 通过keyup change事件将textarea 发送到父组件，可以自定义事件
        });
      },
      images_upload_url: '/upload',
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);        // 组件移除时销毁编辑器
  }
}