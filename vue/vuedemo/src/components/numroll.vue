<template>
 <span ref="numberGrow" :data-time="time" :data-value="value">{{value}}</span>
</template>
<script>
export default {
  props: {
    time: {
      type: Number
    },
    value: {
      type: Number
    }
  },
  methods: {
    numberGrow(ele) {
      let that = this;
      let step = (Math.round((that.value * 10) / (that.time * 10))/100);
      let current = 0;
      let start = 0;
      let t = setInterval(function() {
        start=(Math.round((start + step)*100))/100;
        if (start > that.value) {
          clearInterval(t);
          start = that.value;
          t = null;
        }
        if (current === start) {
          return;
        }
        current = start;
        ele.innerHTML = current
          .toString()
          // .replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, "$1,");
      }, 10);
    }
  },
  mounted() {
    this.numberGrow(this.$refs.numberGrow);
  }
};
</script>
<style>
</style>