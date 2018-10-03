<template>
  <div class="check">
    <div class="name">{{list.name}}</div>
    <div class='label' v-for='(item,index) in list.check' :key='item.id'>
      <!-- <label :name='list.fieldType' v-for='item in list.check' :key='item.id'>
        <input type='checkbox' v-model='list.checkValue' :value='item' :disabled='list.readOnly'>{{item}}
      </label>
       -->
      <input :id='list.fieldType+index' :name='list.fieldType' type='checkbox' v-model='list.checkValue' :value='item' :disabled='list.readOnly'>
      <label :for='list.fieldType+index'>
        {{item}}
      </label>
    </div>
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
.check {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .label {
    width: 25%;
    label {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    label:before {
      content: "";
      width: 12px;
      height: 12px;
      border-radius:12px;
      border: 1px solid red;
    }
    input {
      display: none;
    }
    input:checked + label:before {
      background: red;
    }
    input:disabled + label:before {
      background: blue;
    }
    input:disabled:checked + label:before {
      background: green;
    }
  }
}
</style>