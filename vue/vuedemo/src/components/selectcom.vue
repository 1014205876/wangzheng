<template>
  <div class="selectcom">
    <label>

    <div class="name">{{list.name}}</div>
    <select v-model='list.optionValue' :disabled='list.readOnly'>
      <option value="" disabled>请选择</option>
      <option v-for='item in list.option' :value="item" :key='item.id'>{{item}}</option>
    </select>
    </label>
  </div>
</template>

<script>
export default {
  name: "Selectcom",
  data() {
    return {};
  },
  props: ["list", "index"],
  watch: {
    // optionValue() {
    //   let that = this;
    //   that.$emit("data", { optionValue: that.optionValue, index: that.index });
    // }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.selectcom {
  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    select {
      width: 50%;
      background: yellow;
      color: #000;
      option {
        text-align: center;
      }
    }
  }
}
</style>
