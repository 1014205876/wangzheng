<template>
  <div>
    <div class="back">
      <h2 v-on:click='back'>
        <img src="/static/img/back.png" alt="">
        <div class='title'>
          <slot name="title"></slot>
        </div>
        <div class='more'>
          <slot name="more"></slot>
          <slot msg="子组件"></slot>
        </div>
      </h2>
    </div>
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
  h2 {
    padding: 0.2rem 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 0.5rem;
    }

    .title {
      font-size: 0.5rem;
      color: red;
    }

    .more {
      font-size: 0.14rem;
      color: blue
    }
  }
</style>