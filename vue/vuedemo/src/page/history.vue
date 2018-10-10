<template>
  <div class="history">
    <ul class='data'>
      <li v-for='(list,index) in history' :key='list.id'>{{list+(index+1)}}</li>
    </ul>
    <div class='loading' v-show='loading'>
      <img src="static/img/loading.png" alt="">
      载入中，请等待
    </div>
  </div>
</template>

<script>
// 引入jq
import $ from "jquery";
export default {
  name: "Form",
  data() {
    return {
      history: [
        "历史记录",
        "历史记录",
        "历史记录",
        "历史记录",
        "历史记录",
        "历史记录",
        "历史记录",
        "历史记录",
        "历史记录",
        "历史记录"
      ],
      loading: false,
      switch: true
    };
  },
  methods: {},
  mounted() {
    let that = this;
    let newArr = ["历史记录", "历史记录", "历史记录", "历史记录", "历史记录"];
    $(document).on("scroll", function() {
      console.log("滚动");
      console.log($(document).scrollTop());
      console.log($(window).height());
      console.log($(document).height());
      console.log($(document).scrollTop() + $(window).height());
      if (
        $(document).scrollTop() + $(window).height() >=
        $(document).height()
      ) {
        that.loading = true;
        if (that.switch) {
          that.switch = false;
          setTimeout(function() {
            console.log("刷新");
            that.history = that.history.concat(newArr);
            console.log(that.history);
            that.loading = false;
            that.switch = true;
          }, 2000);
        }
      }
    });
  }
};
</script>

<style lang="less" scoped>
.history {
  position: relative;
  padding-bottom: 1rem;
  .data {
    li {
      width: 90%;
      line-height: 2rem;
      border-radius: 0.2rem;
      background: skyblue;
      font-size: 0.4rem;
      margin: 0.2rem auto;
    }
  }
  .loading {
    position: absolute;
    bottom: 0;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 0.5rem;
      height: 0.5rem;
      animation-name: myfirst;
      animation-duration: 2s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    @keyframes myfirst {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
