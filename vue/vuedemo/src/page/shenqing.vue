<template>
  <div class="shenqing">
    <back></back>
    日历页面
    <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate"></Calendar>
  </div>
</template>

<script>
// 引入返回组件
import Back from "@/components/back";
// 引入jq
import $ from "jquery";
// 引入日历组件
import Calendar from "vue-calendar-component";
export default {
  name: "Shenqing",
  data() {
    return {};
  },
  components: {
    back: Back,
    Calendar
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    clickDay(data) {
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); //跳到了本月
    }
  }
};
</script>

<style lang="less" scoped>
</style>
