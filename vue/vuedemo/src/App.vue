<template>
  <div id="app">
    <transition :name="run" mode="out-in">
      <!-- <router-view v-wechat-title='$route.meta.title'></router-view> -->
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      run: "left"
    };
  },
  watch: {
    $route(to, from) {
      if (to.meta.index < from.meta.index) {
        this.run = "right";
      } else {
        this.run = "left";
      }
    }
  }
};
</script>

<style>
</style>
