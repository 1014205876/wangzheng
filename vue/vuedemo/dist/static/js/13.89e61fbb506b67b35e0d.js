webpackJsonp([13],{"9sem":function(e,t){},Ntyz:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={name:"Login",data:function(){return{tel:13767060145,code:123,setInt:!1,countDown:60}},methods:{send:function(){var e=this;if(/^1[0-9]{10}$/.test(e.tel)){e.setInt=!0,clearInterval(t),e.countDown=60;var t=setInterval(function(){e.countDown=e.countDown-1,e.countDown<=0&&(clearInterval(t),e.setInt=!1)},100)}else alert("手机号错误")},signIn:function(){123==this.code?(localStorage.setItem("indexUrlwangzheng",!this.remember),sessionStorage.setItem("logingwangzheng",!0),this.$router.push("/rou/index")):alert("验证码错误")},register:function(){console.log("注册")}}},r={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login"},[n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.tel,expression:"tel"}],attrs:{type:"text",placeholder:"输入手机号"},domProps:{value:e.tel},on:{input:function(t){t.target.composing||(e.tel=t.target.value)}}})]),e._v(" "),n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],attrs:{type:"text",placeholder:"输入验证码"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),e._v(" "),e.setInt?n("button",[e._v(e._s(e.countDown)+"秒后可重发")]):n("button",{on:{click:e.send}},[e._v("发送手机验证码")])]),e._v(" "),n("div",[n("button",{on:{click:e.signIn}},[e._v("登录")])]),e._v(" "),n("div",[n("button",{on:{click:e.register}},[e._v("注册")])])])},staticRenderFns:[]};var s=n("C7Lr")(o,r,!1,function(e){n("9sem")},"data-v-1b382c6e",null);t.default=s.exports}});
//# sourceMappingURL=13.89e61fbb506b67b35e0d.js.map