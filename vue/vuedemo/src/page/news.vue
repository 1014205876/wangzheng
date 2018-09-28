<template>
  <div class="news">
   新闻页面
   <!-- <input type="file" accept="image/*" style='width:100%;height:100px'> -->
  <!-- <nav-footr :active='"1"'></nav-footr> -->
  </div>
</template>

<script>
import Navfootr from "@/components/Nav";
export default {
  name: "News",
  data() {
    return {
      abc: 1
    };
  },
  components: {
    navFootr: Navfootr
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
</style>
