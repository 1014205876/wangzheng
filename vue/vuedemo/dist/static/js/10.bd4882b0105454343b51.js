webpackJsonp([10],{"+hdV":function(e,i,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=a("qqHy"),t=a.n(n),s={name:"News",data:function(){return{news:[{type:"系统消息"},{type:"借款消息"},{type:"还款消息"}],main:[[{name:"征信贷",orderNum:123,nowTimes:3,allTimes:10,days:1,time:"18/03/01"},{name:"企业信用卡",orderNum:1321,nowTimes:1,allTimes:12,days:2,time:"18/03/01"},{name:"房抵债",orderNum:123,nowTimes:6,allTimes:11,days:3,time:"18/03/01"}],[{name:"企业信用卡",orderNum:1321,nowTimes:1,allTimes:12,days:2,time:"18/03/01"},{name:"房抵债",orderNum:123,nowTimes:6,allTimes:11,days:3,time:"18/03/01"},{name:"征信贷",orderNum:123,nowTimes:3,allTimes:10,days:1,time:"18/03/01"}],[{name:"征信贷",orderNum:123,nowTimes:3,allTimes:10,days:1,time:"18/03/01"},{name:"企业信用卡",orderNum:1321,nowTimes:1,allTimes:12,days:2,time:"18/03/01"},{name:"房抵债",orderNum:123,nowTimes:6,allTimes:11,days:3,time:"18/03/01"}]]}},components:{navFootr:a("uL8o").a},methods:{switcher:function(e){t()(".news .nav>li").removeClass("active"),t()(".news .nav>li").eq(e).addClass("active"),t()(".news .main>li").removeClass("active"),t()(".news .main>li").eq(e).addClass("active")},infoJq:function(){t()(".news .nav li").eq(0).addClass("active"),t()(".news .main>li").eq(0).addClass("active"),t()(".news").css("min-height",t()(window).height())},infoEchart:function(){var e=this.$echarts.init(document.getElementById("myChart")),i=[{xAxis:[{data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],yAxis:{},series:[{name:"销量",type:"bar",data:[5,15,10,20,10,10,20]},{name:"销量",type:"line",data:[5,15,10,20,10,10,20]}]},{xAxis:[{data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],yAxis:{},series:[{name:"销量",type:"bar",data:[5,20,36,30,10,10,20]}]},{xAxis:[{data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}],yAxis:[],series:[{data:[10,52,200,334,390,330,220]}]}];e.setOption(i[0]),t()(".news .nav li").click(function(){e.setOption(i[t()(this).index()])})},toform:function(){this.$router.push({path:"/form"})},tomap:function(){this.$router.push({path:"/mapPage"})}},mounted:function(){this.infoJq(),this.infoEchart()}},m={render:function(){var e=this,i=e.$createElement,a=e._self._c||i;return a("div",{staticClass:"news"},[e._v("\n    消息页面页面\n    "),a("ul",{staticClass:"nav"},e._l(e.news,function(i,n){return a("li",{key:i.id,on:{click:function(i){return e.switcher(n)}}},[e._v("\n            "+e._s(i.type)+"\n        ")])}),0),e._v(" "),a("ul",{staticClass:"main"},e._l(e.main,function(i){return a("li",{key:i.id},[a("ul",{staticClass:"order"},e._l(i,function(i){return a("li",{key:i.id},[a("div",{staticClass:"tips"},[e._v("\n                        您在"+e._s(i.name)+"公司的的贷款【订单号"+e._s(i.orderNum)+"】的第【"+e._s(i.nowTimes)+"/"+e._s(i.allTimes)+"】期还有"+e._s(i.days)+"天就要划扣了\n                        您在"+e._s(i.name)+"公司的的贷款【订单号"+e._s(i.orderNum)+"】的第【"+e._s(i.nowTimes)+"/"+e._s(i.allTimes)+"】期还有"+e._s(i.days)+"天就要划扣了\n                    ")]),e._v(" "),a("span"),e._v(" "),a("div",{staticClass:"time"},[e._v("\n                        "+e._s(i.time)+"\n                    ")])])}),0)])}),0),e._v(" "),a("div",{staticClass:"mychart",attrs:{id:"myChart"}}),e._v(" "),a("button",{staticStyle:{display:"block",width:"70%",margin:"0 auto",padding:"0.15rem 0"},on:{click:e.toform}},[e._v("创建表单")]),e._v(" "),a("button",{staticStyle:{display:"block",width:"70%",margin:"0 auto",padding:"0.15rem 0"},on:{click:e.tomap}},[e._v("地图页面")])])},staticRenderFns:[]};var o=a("C7Lr")(s,m,!1,function(e){a("j6OE")},"data-v-d42db040",null);i.default=o.exports},j6OE:function(e,i){}});
//# sourceMappingURL=10.bd4882b0105454343b51.js.map