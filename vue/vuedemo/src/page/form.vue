<template>
  <div class="form">
    <back></back>
    <form @submit.prevent="submit">
      <ul>
        <li v-for='(list,index) in form' :key='list.id'>
          <inputcom v-if='list.type=="input"' v-bind:list='list' v-bind:index='index' v-on:data='inputchange'></inputcom>
          <selectcom v-if='list.type=="select"' v-bind:list='list' v-bind:index='index' v-on:data='selectchange'></selectcom>
          <datecom v-if='list.type=="date"' v-bind:list='list' v-bind:index='index' v-on:data='datechange'></datecom>
        </li>
      </ul>
      <input class='submit' type="submit">
    </form>
  </div>
</template>

<script>
// 引入返回组件
import Back from "@/components/back";
// 引入表单组件
import inputcom from "@/components/inputcom";
import selectcom from "@/components/selectcom";
import datecom from "@/components/datecom";
export default {
  name: "Form",
  components: {
    back: Back,
    inputcom,
    selectcom,
    datecom
  },
  data() {
    return {
      form: [
        {
          fieldType: "FormField1",
          name: "最终预约时间1",
          type: "input",
          value: "此项禁用",
          readOnly: true,
          required: true
        },
        {
          fieldType: "FormField2",
          name: "最终预约时间2",
          type: "input",
          value: "",
          readOnly: false,
          required: true
        },
        {
          fieldType: "FormField3",
          name: "最终预约时间3",
          type: "input",
          value: "",
          readOnly: false,
          required: true
        },
        {
          fieldType: "FormField1",
          name: "最终预约时间1",
          type: "select",
          option: ["选项1", "选项2", "选项3"],
          optionValue: "选项1",
          readOnly: true,
          required: true
        },
        {
          fieldType: "FormField2",
          name: "最终预约时间2",
          type: "select",
          option: ["选项1", "选项2", "选项3"],
          optionValue: "",
          readOnly: false,
          required: true
        },
        {
          fieldType: "FormField3",
          name: "最终预约时间3",
          type: "select",
          option: ["选项1", "选项2", "选项3"],
          optionValue: "",
          readOnly: false,
          required: true
        },
        {
          fieldType: "FormField1",
          name: "最终预约时间1",
          type: "date",
          value: "2018-09-07",
          readOnly: true,
          required: true
        },
        {
          fieldType: "FormField2",
          name: "最终预约时间2",
          type: "date",
          value: "",
          readOnly: false,
          required: true
        },
        {
          fieldType: "FormField3",
          name: "最终预约时间3",
          type: "date",
          value: "",
          readOnly: false,
          required: true
        },
      ]
    };
  },
  methods: {
    inputchange(data) {
      console.log(data);
      this.form[data.index].value = data.value;
    },
    selectchange(data) {
      console.log(data);
      this.form[data.index].optionValue = data.optionValue;
    },
    datechange(data) {
      console.log(data);
      this.form[data.index].value = data.value;
    },
    submit() {
      let that = this;
      for (let i = 0; i < that.form.length; i++) {
        if (that.form[i].required) {
          if (that.form[i].value || that.form[i].optionValue) {
          }else{
            console.log(`第${i}项没填`);

          }
        }
      }
      // this.forEach(that);
      console.log(this.form);
    },
    forEach(that) {
      for (let i = 0; i < that.form.length; i++) {
        if (that.form[i].required) {
          if (that.form[i].value && that.form[i].optionValue) {
          } else {
            return;
            alert(`第${i}项没填`);
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  ul {
    li {
      line-height: 0.6rem;
      font-size: 0.3rem;
    }
  }
  .submit {
    display: block;
    width: 70%;
    margin: 0 auto;
    padding: 5px 0px;
  }
}
</style>
