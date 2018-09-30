<template>
  <div class="datecom">
    <label>
    <div class="name">{{list.name}}</div>
    <input type="date" v-model='list.value' :disabled='list.readOnly'>
    </label>
  </div>
</template>

<script>
export default {
  name: "Datecom",
  data() {
    return {
      // value: ""
    };
  },
  props: ["list", "index"],
  watch: {
    // value() {
    //   let that = this;
    //   that.$emit("data", { value: that.value, index: that.index });
    // }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.datecom {
  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      display: block;
      width: 50%;
      background: blue;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
