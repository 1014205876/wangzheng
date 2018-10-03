<template>
  <div class="radio">
    <div class="name">{{list.name}}</div>
    <label :name='list.fieldType' v-for='item in list.check' :key='item.id'>
      <input type='checkbox' v-model='list.checkValue' :value='item' :disabled='list.readOnly'>{{item}}
    </label>
  </div>
</template>

<script>
  export default {
    name: "Checkocom",
    data() {
      return {};
    },
    props: ["list"],
    methods: {}
  };
</script>

<style lang="less" scoped>
  .radio {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>