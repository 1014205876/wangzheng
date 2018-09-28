<template>
  <div class="shenqing">
  <back></back>
   申请贷款页面
  </div>
</template>

<script>
// 引入返回组件
import Back from "@/components/back";
// 引入jq
import $ from "jquery";
// 引入日历组件
export default {
  name: "Shenqing",
  data() {
    return {};
  },
  components: {
    back: Back
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  }
};
</script>

<style lang="less" scoped>
</style>
