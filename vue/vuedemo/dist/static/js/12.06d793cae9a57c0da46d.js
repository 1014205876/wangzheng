webpackJsonp([12],{HN9s:function(o,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=n("qqHy"),i=n.n(e),s={name:"Form",data:function(){return{history:["历史记录","历史记录","历史记录","历史记录","历史记录","历史记录","历史记录","历史记录","历史记录","历史记录"],loading:!1,switch:!0}},methods:{},mounted:function(){var o=this,t=["历史记录","历史记录","历史记录","历史记录","历史记录"];i()(document).on("scroll",function(){console.log("滚动"),console.log(i()(document).scrollTop()),console.log(i()(window).height()),console.log(i()(document).height()),console.log(i()(document).scrollTop()+i()(window).height()),i()(document).scrollTop()+i()(window).height()>=i()(document).height()&&(o.loading=!0,o.switch&&(o.switch=!1,setTimeout(function(){console.log("刷新"),o.history=o.history.concat(t),console.log(o.history),o.loading=!1,o.switch=!0},2e3)))})}},c={render:function(){var o=this,t=o.$createElement,n=o._self._c||t;return n("div",{staticClass:"history"},[n("ul",{staticClass:"data"},o._l(o.history,function(t,e){return n("li",{key:t.id},[o._v(o._s(t+(e+1)))])}),0),o._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:o.loading,expression:"loading"}],staticClass:"loading"},[n("img",{attrs:{src:"static/img/loading.png",alt:""}}),o._v("\n    载入中，请等待\n  ")])])},staticRenderFns:[]};var l=n("C7Lr")(s,c,!1,function(o){n("uJFN")},"data-v-1b9229b7",null);t.default=l.exports},uJFN:function(o,t){}});
//# sourceMappingURL=12.06d793cae9a57c0da46d.js.map