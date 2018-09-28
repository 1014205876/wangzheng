<template>
  <div class="apply">
  <back></back>
  <div>

   {{name}}申请页面
  </div>
  <div>
    申请额度{{minQuota}}-{{maxQuota}}万
  </div>
   <button v-on:click='shenqing' style='width:6rem;height:1rem;font-size:0.5rem;display:block'>立即申请</button>
  </div>
</template>

<script>
// 引入返回组件
import Back from "@/components/back";
export default {
  name: "Apply",
  data() {
    return {
      name:'公司名',
      minQuota:'最小',
      maxQuota:'最大',
    };
  },
  components: {
    back: Back
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    shenqing(){
      this.$router.push("/shenqing");
    }
  },
  mounted(){
    this.name=this.$route.query.name
    this.minQuota=this.$route.query.minQuota
    this.maxQuota=this.$route.query.maxQuota
  }
};
</script>

<style lang="less" scoped>
</style>
