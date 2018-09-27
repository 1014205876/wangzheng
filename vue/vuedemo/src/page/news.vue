<template>
  <div class="news">
   新闻页面
  <nav-footr :active='"1"'></nav-footr>
  </div>
</template>

<script>
import Navfootr from '@/components/Nav'
export default {
  name: "News",
  data() {
    return {
      
      abc:1,
    };
  },
  components: {
    navFootr:Navfootr
  },
};
</script>

<style scoped>
</style>
