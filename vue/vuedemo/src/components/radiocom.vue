<template>
  <div class="radio">
    <div class="name">{{list.name}}</div>
    <label :name='list.fieldType' v-for='item in list.radio' :key='item.id'>
      <input type='radio' v-model='list.radioValue' :value='item' :disabled='list.readOnly'>{{item}}
    </label>
  </div>
</template>

<script>
export default {
  name: "Radiocom",
  data() {
    return {

    };
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
