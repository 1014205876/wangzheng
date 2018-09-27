<template>
  <ul class='nav'>
    <li v-for="list in nav" :key='list.id'>
      <router-link  :to='list.url'>
        <div class='remind' v-if="list.remind"></div>
        <img v-if='!list.active' :src="list.img" alt="">
        <img v-else :src="list.imgact" alt="">
        <div class='page' :class='{red:list.active}'>{{list.page}}</div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      nav: [
        {
          url: "/index",
          active: false,
          img: "static/img/index.png",
          imgact: "../static/img/indexactive.png",
          page: "首页",
          remind: true
        },
        {
          url: "/news",
          active: false,
          img: "static/img/index.png",
          imgact: "../static/img/indexactive.png",
          page: "消息",
          remind: true
        },
        {
          url: "/my",
          active: false,
          img: "static/img/index.png",
          imgact: "../static/img/indexactive.png",
          page: "我的",
          remind: true
        }
      ]
    };
  },
  props: ["active"],
  methods: {},
  mounted() {
    this.nav[this.active].active = true;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.nav {
  position: fixed;
  bottom: 0;
  width: 7.5rem;
  height:1rem;
  background:#fff;
  border-top:1px solid #000;
  display: flex;
  li {
    flex: 1;
    position: relative;
    a {
      display: block;
      .remind {
        width: 0.2rem;
        height: 0.2rem;
        border-radius: 0.2rem;
        background: red;
        position: absolute;
        top: 0rem;
        right: 0rem;
      }
      img {
        display: block;
        width: 0.5rem;
        margin: 0 auto;
      }
      .red{
        color:red;
      }
      .page {
        text-align: center;
        font-size: 0.2rem;
      }
    }
  }
}
</style>
