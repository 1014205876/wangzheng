<template>
  <div class="apply">
    <div class='tanimate'>
      <back></back>
      <div>
        {{name}}申请页面
      </div>
      <div>
        申请额度{{minQuota}}-{{maxQuota}}万
      </div>
      <span style='font-size:1rem;color:red'>
        <numroll :value="number" :time='time'></numroll>
      </span>
      <button v-on:click='reload'>刷新</button>
      <el-button v-on:click='tohistory'>历史记录</el-button>
      <button v-on:click='shenqing'>立即申请</button>
      <ul class='xiala'>
        <li v-for='list in xiala' :key='list.id'>
          <div class="xianshi">
            {{list.xianshi}}
            <img src="static/img/back.png" alt="" class="btn">
          </div>
          <div class="yincang">
            <div v-for='item in list.yincang' :key='item.id'>{{item}}</div>
          </div>
        </li>
      </ul>
      <button v-on:click='start' class='start'>开启动画</button>
    </div>
    <div class="banimate" v-on:click='stop'>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
    <div class="head">

      <div class="left">
        左动画
      </div>
      <div class="right">
        右动画
      </div>
    </div>
  </div>
</template>

<script>
// 引入jq
import $ from "jquery";
// 引入返回组件
import Back from "@/components/back";
// 引入数字滚动组件
import numroll from "@/components/numroll";
export default {
  name: "Apply",
  data() {
    return {
      number: 10000,
      time: 2,
      name: "公司名",
      minQuota: "最小",
      maxQuota: "最大",
      xiala: [
        {
          xianshi: "显示的东西",
          yincang: [
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3"
          ]
        },
        {
          xianshi: "显示的东西",
          yincang: [
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3"
          ]
        },
        {
          xianshi: "显示的东西",
          yincang: [
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3"
          ]
        },
        {
          xianshi: "显示的东西",
          yincang: [
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3"
          ]
        },
        {
          xianshi: "显示的东西",
          yincang: [
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3"
          ]
        },
        {
          xianshi: "显示的东西",
          yincang: [
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3",
            "隐藏1",
            "隐藏2",
            "隐藏3"
          ]
        }
      ]
    };
  },
  components: {
    back: Back,
    numroll
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    reload(){
      this.$refs.alert.alertclose();
    },
    tohistory() {
      this.$router.push("/history");
    },
    shenqing() {
      this.$router.push("/shenqing");
    },
    open(index) {
      this.xiala[index].kaiguan = !this.xiala[index].kaiguan;
    },
    start() {
      $("html,body").animate({ scrollTop: 0 }, 0);
      $(".apply .tanimate").addClass("active");
      $(".apply .banimate").addClass("active");
      $(".apply .left").addClass("active");
      $(".apply .right").addClass("active");
    },
    stop() {
      console.log(1);
      $(".apply .tanimate").removeClass("active");
      $(".apply .banimate").removeClass("active");
      $(".apply .left").removeClass("active");
      $(".apply .right").removeClass("active");
    }
  },
  mounted() {
    $(".apply .tanimate .xiala li .xianshi").click(function() {
      if (
        $(this)
          .find(".btn")
          .hasClass("active")
      ) {
        $(this)
          .parent()
          .find(".yincang")
          .slideUp(200);
        $(this)
          .find(".btn")
          .removeClass("active");
      } else {
        $(this)
          .parent()
          .find(".yincang")
          .slideDown(200);
        $(this)
          .find(".btn")
          .addClass("active");
      }
    });
    // $(".apply").css("min-height", $(window).height());
    // $(".apply .banimate").css("height", $(window).height());
  },
  created() {
    this.$http.get('/api/goods').then((data) =>{
      this.items = data.body.data
    })
    this.name = this.$route.query.name;
    this.minQuota = this.$route.query.minQuota;
    this.maxQuota = this.$route.query.maxQuota;
  }
};
</script>

<style lang="less" scoped>
.apply {
  width: 100%;
  // overflow: hidden;
  position: relative;

  button {
    display: block;
    width: 6rem;
    height: 1rem;
    margin: 0 auto;
  }

  .tanimate {
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: burlywood;
    -moz-box-sizing: border-box;
    /*Firefox3.5+*/
    -webkit-box-sizing: border-box;
    /*Safari3.2+*/
    -o-box-sizing: border-box;
    /*Opera9.6*/
    -ms-box-sizing: border-box;
    /*IE8*/
    padding-bottom: 1rem;
    transform: translateY(0%);
    transition: all 1s;
    -webkit-transition: all 1s;
    /* Safari */
    transition-timing-function: linear;
    -webkit-transition-timing-function: linear;

    /* Safari and Chrome */
    .start {
      position: absolute;
      bottom: 0rem;
      width: 100%;
      height: 1rem;
      font-size: 0.4rem;
    }

    .xiala {
      li {
        overflow: hidden;

        .xianshi {
          line-height: 1rem;
          border-bottom: 1px solid #333;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .btn {
            width: 0.5rem;
            height: 0.5rem;
            transform: rotate(180deg);
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
            /* Safari */
            transition-timing-function: linear;
            -webkit-transition-timing-function: linear;
            /* Safari and Chrome */
          }

          .btn.active {
            transform: rotate(270deg);
          }
        }

        .yincang {
          border-bottom: 1px solid #333;
          display: none;
          // position:absolute;
          background: red;
          // transform: translateY(-100%);
          // transition: all 0.2s;
          // -webkit-transition: all 0.2s; /* Safari */
          // transition-timing-function: linear;
          // -webkit-transition-timing-function: linear; /* Safari and Chrome */
        }

        .yincang.active {
          // transform: translateY(0%);
          display: block;
        }
      }
    }
  }

  .tanimate.active {
    transform: translateY(-100%);
  }

  .banimate {
    position: relative;
    z-index: -30;
    width: 100%;
    transform: translateY(100%);
    transition: all 2s;
    -webkit-transition: all 2s;
    /* Safari */
    transition-timing-function: ease;
    -webkit-transition-timing-function: ease;

    /* Safari and Chrome */
    .box {
      width: 80%;
      height: 3rem;
      background: skyblue;
      border-radius: 0.5rem;
      margin: 0.5rem auto;
    }
  }

  .banimate.active {
    transform: translateY(0%);
    z-index: 30;
  }

  .head {
    width: 100%;
    height: 1rem;
    z-index: 20;
    position: fixed;
    top: 0;
    overflow: hidden;

    .left {
      position: absolute;
      top: 0;
      left: 0;
      width: 40%;
      background: red;
      line-height: 1rem;
      transform: translateX(-100%);
      overflow: hidden;
      transition: all 2s;
      -webkit-transition: all 2s;
      /* Safari */
    }

    .left.active {
      transform: translateX(0%);
    }

    .right {
      position: absolute;
      top: 0;
      right: 0;
      width: 40%;
      background: red;
      line-height: 1rem;
      transform: translateX(100%);
      overflow: hidden;
      transition: all 2s;
      -webkit-transition: all 2s;
      /* Safari */
    }

    .right.active {
      transform: translateX(0%);
    }
  }
}
</style>