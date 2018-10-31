<template>
  <div class="inputcom">
    <label>
      <div class="name">{{list.name}}</div>
      <input type="text" v-model='list.value' :disabled='list.readOnly'>
    </label>
  </div>
</template>

<script>
export default {
  name: "Inputcom",
  data() {
    return {
    };
  },
  props: ["list"],
  methods: {}
};
</script>

<style lang="less" scoped>
.inputcom {
  label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      display: block;
      width: 50%;
      background: red;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
