webpackJsonp([1],{CJjW:function(e,t){},FGdy:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("pKZN"),l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"inputcom"},[a("label",[a("div",{staticClass:"name"},[e._v(e._s(e.list.name))]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.list.value,expression:"list.value"}],attrs:{type:"text",disabled:e.list.readOnly},domProps:{value:e.list.value},on:{input:function(t){t.target.composing||e.$set(e.list,"value",t.target.value)}}})])])},staticRenderFns:[]};var r=a("VU/8")({name:"Inputcom",data:function(){return{}},props:["list"],methods:{}},l,!1,function(e){a("lOJv")},"data-v-9e8f0878",null).exports,n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"selectcom"},[a("div",{staticClass:"name"},[e._v(e._s(e.list.name))]),e._v(" "),a("div",{staticClass:"select"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.list.optionValue,expression:"list.optionValue"}],attrs:{disabled:e.list.readOnly},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.$set(e.list,"optionValue",t.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"",disabled:""}},[e._v("请选择")]),e._v(" "),e._l(e.list.option,function(t){return a("option",{key:t.id,domProps:{value:t}},[e._v(e._s(t))])})],2)])])},staticRenderFns:[]};var s=a("VU/8")({name:"Selectcom",data:function(){return{}},props:["list"],methods:{}},n,!1,function(e){a("Xxyw")},"data-v-0c6b36b5",null).exports,o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"datecom"},[a("label",[a("div",{staticClass:"name"},[e._v(e._s(e.list.name))]),e._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.list.value,expression:"list.value"}],attrs:{type:"date",disabled:e.list.readOnly},domProps:{value:e.list.value},on:{input:function(t){t.target.composing||e.$set(e.list,"value",t.target.value)}}})])])},staticRenderFns:[]};var d=a("VU/8")({name:"Datecom",data:function(){return{}},props:["list"],methods:{}},o,!1,function(e){a("f7mz")},"data-v-5ab521e8",null).exports,c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"radio"},[a("div",{staticClass:"name"},[e._v(e._s(e.list.name))]),e._v(" "),e._l(e.list.radio,function(t,i){return a("div",{key:t.id,staticClass:"label"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.list.radioValue,expression:"list.radioValue"}],attrs:{id:e.list.fieldType+i,name:e.list.fieldType,type:"radio",disabled:e.list.readOnly},domProps:{value:t,checked:e._q(e.list.radioValue,t)},on:{change:function(a){return e.$set(e.list,"radioValue",t)}}}),e._v(" "),a("label",{attrs:{for:e.list.fieldType+i}},[e._v("\n      "+e._s(t)+"\n    ")])])})],2)},staticRenderFns:[]};var u=a("VU/8")({name:"Radiocom",data:function(){return{}},props:["list"],methods:{}},c,!1,function(e){a("rg+u")},"data-v-70333d3c",null).exports,m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"check"},[a("div",{staticClass:"name"},[e._v(e._s(e.list.name))]),e._v(" "),e._l(e.list.check,function(t,i){return a("div",{key:t.id,staticClass:"label"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.list.checkValue,expression:"list.checkValue"}],attrs:{id:e.list.fieldType+i,name:e.list.fieldType,type:"checkbox",disabled:e.list.readOnly},domProps:{value:t,checked:Array.isArray(e.list.checkValue)?e._i(e.list.checkValue,t)>-1:e.list.checkValue},on:{change:function(a){var i=e.list.checkValue,l=a.target,r=!!l.checked;if(Array.isArray(i)){var n=t,s=e._i(i,n);l.checked?s<0&&e.$set(e.list,"checkValue",i.concat([n])):s>-1&&e.$set(e.list,"checkValue",i.slice(0,s).concat(i.slice(s+1)))}else e.$set(e.list,"checkValue",r)}}}),e._v(" "),a("label",{attrs:{for:e.list.fieldType+i}},[e._v("\n      "+e._s(t)+"\n    ")])])})],2)},staticRenderFns:[]};var p=a("VU/8")({name:"Checkocom",data:function(){return{}},props:["list"],methods:{}},m,!1,function(e){a("CJjW")},"data-v-40ca4d28",null).exports,v={name:"Form",components:{back:i.a,inputcom:r,selectcom:s,datecom:d,checkcom:p,radiocom:u},data:function(){return{form:[{fieldType:"FormField00",name:"表单名字00",type:"input",value:"此项禁用",readOnly:!0,required:!0},{fieldType:"FormField01",name:"表单名字01",type:"input",value:"",readOnly:!1,required:!0},{fieldType:"FormField02",name:"表单名字02",type:"input",value:"",readOnly:!1,required:!1},{fieldType:"FormField03",name:"表单名字03",type:"select",option:["选项1","选项2","选项3"],optionValue:"选项1",readOnly:!0,required:!0},{fieldType:"FormField04",name:"表单名字04",type:"select",option:["选项1","选项2","选项3"],optionValue:"",readOnly:!1,required:!0},{fieldType:"FormField05",name:"表单名字05",type:"select",option:["选项1","选项2","选项3"],optionValue:"",readOnly:!1,required:!1},{fieldType:"FormField06",name:"表单名字06",type:"radio",radio:["选项1","选项2","选项3"],radioValue:"选项1",readOnly:!0,required:!0},{fieldType:"FormField07",name:"表单名字07",type:"radio",radio:["选项1","选项2","选项3"],radioValue:"",readOnly:!1,required:!0},{fieldType:"FormField08",name:"表单名字08",type:"radio",radio:["选项1","选项2","选项3"],radioValue:"",readOnly:!1,required:!1},{fieldType:"FormField09",name:"表单名字09",type:"check",check:["选项1","选项2","选项3"],checkValue:["选项1"],readOnly:!0,required:!0},{fieldType:"FormField10",name:"表单名字10",type:"check",check:["选项1","选项2","选项3"],checkValue:[],readOnly:!1,required:!0},{fieldType:"FormField11",name:"表单名字11",type:"check",check:["选项1","选项2","选项3"],checkValue:[],readOnly:!1,required:!1},{fieldType:"FormField12",name:"表单名字12",type:"date",value:"2018-09-07",readOnly:!0,required:!0},{fieldType:"FormField13",name:"表单名字13",type:"date",value:"",readOnly:!1,required:!0},{fieldType:"FormField14",name:"表单名字14",type:"date",value:"",readOnly:!1,required:!1}]}},methods:{submit:function(){this.forEach(this),console.log(this.form),this.$router.push("/formjson")},forEach:function(e){for(var t=0;t<e.form.length;t++)e.form[t].required&&(e.form[t].value||e.form[t].optionValue||e.form[t].radioValue||e.form[t].checkValue&&e.form[t].checkValue.length>0||console.log("第"+t+"项没填"))}}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form"},[a("back"),e._v(" "),a("form",{on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[a("ul",e._l(e.form,function(t){return a("li",{key:t.id},["input"==t.type?a("inputcom",{attrs:{list:t}}):e._e(),e._v(" "),"date"==t.type?a("datecom",{attrs:{list:t}}):e._e(),e._v(" "),"select"==t.type?a("selectcom",{attrs:{list:t}}):e._e(),e._v(" "),"radio"==t.type?a("radiocom",{attrs:{list:t}}):e._e(),e._v(" "),"check"==t.type?a("checkcom",{attrs:{list:t}}):e._e()],1)}),0),e._v(" "),a("input",{staticClass:"submit",attrs:{type:"submit"}})])],1)},staticRenderFns:[]};var y=a("VU/8")(v,f,!1,function(e){a("Y8EK")},"data-v-83965352",null);t.default=y.exports},Xxyw:function(e,t){},Y8EK:function(e,t){},f7mz:function(e,t){},lOJv:function(e,t){},"rg+u":function(e,t){}});
//# sourceMappingURL=1.a977cf893db88c4cf7c8.js.map