<template>
  <div class="rou">
    <transition :name="run" mode="out-in">
      <router-view />
    </transition>
    <!-- 底部导航 -->
    <nav-footr></nav-footr>
  </div>
</template>

<script>
// 引入jq
import $ from "jquery";
// 引入导航组件
import Navfootr from "@/components/Nav";
export default {
  name: "Rou",
  data() {
    return {
      run: "left"
    };
  },
  components: {
    navFootr: Navfootr
  },
  watch: {
    $route(to, from) {
      if (to.meta.index < from.meta.index) {
        this.run = "right";
      } else {
        this.run = "left";
      }
    }
  },
  mounted() {
    $(".rou").css("height", $(window).height());
  }
};
</script>

<style lang="less" scoped>
</style>