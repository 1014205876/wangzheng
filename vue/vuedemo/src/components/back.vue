<template>
  <div class="back">
  <h2 v-on:click='back'>
    <img src="/static/img/back.png" alt="">
  </h2>
  </div>
</template>

<script>
export default {
  name: "Back",
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  }
};
</script>

<style lang="less" scoped>
h2{
  padding:0.2rem 0.3rem;
  display:flex;
  align-items:center;
  justify-items:self-start;
  img{
    width:0.5rem;
  }
}
</style>
