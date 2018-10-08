<template>
  <ul class='nav'>
    <li v-for="list in nav" :key='list.id'>
      <router-link :to='list.url'>
        <div class='remind' v-if="list.remind"></div>
        <img :src="list.img" alt="">
        <img class='active' :src="list.imgact" alt="">
        <div class='page' :class='{red:list.remind}'>{{list.page}}</div>
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
          url: "/rou/index",
          img: "/static/img/index.png",
          imgact: "/static/img/indexactive.png",
          page: "首页",
          remind: true
        },
        {
          url: "/rou/news",
          img: "/static/img/index.png",
          imgact: "/static/img/indexactive.png",
          page: "消息",
          remind: true
        },
        {
          url: "/rou/my",
          img: "/static/img/index.png",
          imgact: "/static/img/indexactive.png",
          page: "我的",
          remind: false
        }
      ]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.nav {
  position: fixed;
  bottom: 0;
  width: 7.5rem;
  height: 1rem;
  background: #fff;
  border-top: 1px solid #000;
  display: flex;
  z-index:10;
  li {
    flex: 1;
    position: relative;
    a {
      display: block;
      .remind {
        width: 10px;
        height: 10px;
        border-radius: 10px;
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
      .active {
        display: none;
      }
      .page {
        text-align: center;
        font-size: 0.2rem;
      }
    }
    .router-link-exact-active.router-link-active {
      color: red;
      img {
        display: none;
      }
      .active {
        display: block;
      }
    }
  }
}
</style>
