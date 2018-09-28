<template>
  <div class="apply">
  <h2 v-on:click='back'>返回</h2>
   申请页面
   <button v-on:click='shenqing'>立即申请</button>
  </div>
</template>

<script>
export default {
  name: "Apply",
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    shenqing(){
      this.$router.push("/shenqing");
    }
  }
};
</script>

<style lang="less" scoped>
</style>
