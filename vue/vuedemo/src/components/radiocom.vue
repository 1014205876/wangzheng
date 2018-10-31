<template>
  <div class="radio">
    <div class="name">{{list.name}}</div>
    <div class='label' v-for='(item,index) in list.radio' :key='item.id'>
      <input :id='list.fieldType+index' :name='list.fieldType' type='radio' v-model='list.radioValue' :value='item' :disabled='list.readOnly'>
      <label :for='list.fieldType+index'>
        {{item}}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Radiocom",
  data() {
    return {
      //  list: {
      //     fieldType: "FormField07",
      //     name: "表单名字07",
      //     type: "radio",
      //     radio: ["选项1", "选项2", "选项3"],
      //     radioValue: "",
      //     readOnly: false,
      //     required: true
      //   },
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
      width: 6px;
      height: 6px;
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
