<template>
  <div class="apply">
    <back></back>
    <div>

      {{name}}申请页面
    </div>
    <div>
      申请额度{{minQuota}}-{{maxQuota}}万
    </div>
    <el-button>按钮</el-button>
    <button v-on:click='shenqing'>立即申请</button>
    <button v-on:click='start'>开启动画</button>
    <div class="animate" v-on:click='stop'>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </div>
    <div class="left">
      左动画  
    </div>
    <div class="right">
      右动画  
    </div>
  </div>
</template>

<script>
  // 引入jq
  import $ from "jquery";
  // 引入返回组件
  import Back from "@/components/back";
  export default {
    name: "Apply",
    data() {
      return {
        name: "公司名",
        minQuota: "最小",
        maxQuota: "最大"
      };
    },
    components: {
      back: Back
    },
    methods: {
      back() {
        this.$router.go(-1);
      },
      shenqing() {
        this.$router.push("/shenqing");
      },
      start() {
        $(".apply .animate").addClass("active");
        $(".apply .left").addClass("active");
        $(".apply .right").addClass("active");
      },
      stop() {
        $(".apply .animate").removeClass("active");
        $(".apply .left").removeClass("active");
        $(".apply .right").removeClass("active");
      },
    },
    mounted() {
      $(".apply").css("min-height", $(window).height());
    },
    created() {
      this.name = this.$route.query.name;
      this.minQuota = this.$route.query.minQuota;
      this.maxQuota = this.$route.query.maxQuota;
    }
  };
</script>

<style lang="less" scoped>
  .apply {
    position: relative;
    button {
      width: 6rem;
      height: 1rem;
      font-size: 0.4rem;
      display: block;
      margin: 0.2rem auto;
    }
    .animate {
      position: absolute;
      top: 0.5rem;
      background: skyblue;
      width: 100%;
      min-height: 50%;
      transform: translateY(100%);
      overflow: hidden;
      transition: all 2s;
      -webkit-transition: all 2s;
      /* Safari */
    }
    .animate.active {
      transform: translateY(0%)
    }
    .left {
      position: absolute;
      top: 0;
      left:0;
      background: skyblue;
      width: 20%;
      height:0.5rem;
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
      right:0;
      background: skyblue;
      width: 20%;
      height:0.5rem;
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
</style>