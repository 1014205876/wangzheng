<template>
  <div class="form">
    <back></back>
    <form @submit.prevent="submit">
      <ul>
        <li v-for='list in form' :key='list.id'>
          <inputcom v-if='list.type=="input"' v-bind:list='list'></inputcom>
          <datecom v-if='list.type=="date"' v-bind:list='list'></datecom>
          <selectcom v-if='list.type=="select"' v-bind:list='list'></selectcom>
          <radiocom v-if='list.type=="radio"' v-bind:list='list'></radiocom>
          <checkcom v-if='list.type=="check"' v-bind:list='list'></checkcom>
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
import radiocom from "@/components/radiocom";
import checkcom from "@/components/checkcom";
export default {
  name: "Form",
  components: {
    back: Back,
    inputcom,
    selectcom,
    datecom,
    checkcom,
    radiocom
  },
  data() {
    return {
      form: [
        {
          fieldType: "FormField00",
          name: "表单名字00",
          type: "input",
          value: "此项禁用",
          readOnly: true,
          required: true
        },
        {
          fieldType: "FormField01",
          name: "表单名字01",
          type: "input",
          value: "",
          readOnly: false,
          required: true
        },
        {
          fieldType: "FormField02",
          name: "表单名字02",
          type: "input",
          value: "",
          readOnly: false,
          required: false
        },
        {
          fieldType: "FormField03",
          name: "表单名字03",
          type: "select",
          option: ["选项1", "选项2", "选项3"],
          optionValue: "选项1",
          readOnly: true,
          required: true
        },
        {
          fieldType: "FormField04",
          name: "表单名字04",
          type: "select",
          option: ["选项1", "选项2", "选项3"],
          optionValue: "",
          readOnly: false,
          required: true
        },
        {
          fieldType: "FormField05",
          name: "表单名字05",
          type: "select",
          option: ["选项1", "选项2", "选项3"],
          optionValue: "",
          readOnly: false,
          required: false
        },
        {
          fieldType: "FormField06",
          name: "表单名字06",
          type: "radio",
          radio: ["选项1", "选项2", "选项3"],
          radioValue: "选项1",
          readOnly: true,
          required: true
        },
        {
          fieldType: "FormField07",
          name: "表单名字07",
          type: "radio",
          radio: ["选项1", "选项2", "选项3"],
          radioValue: "",
          readOnly: false,
          required: true
        },
        {
          fieldType: "FormField08",
          name: "表单名字08",
          type: "radio",
          radio: ["选项1", "选项2", "选项3"],
          radioValue: "",
          readOnly: false,
          required: false
        },
        {
          fieldType: "FormField09",
          name: "表单名字09",
          type: "check",
          check: ["选项1", "选项2", "选项3"],
          checkValue: ["选项1"],
          readOnly: true,
          required: true
        },
        {
          fieldType: "FormField10",
          name: "表单名字10",
          type: "check",
          check: ["选项1", "选项2", "选项3"],
          checkValue: [],
          readOnly: false,
          required: true
        },
        {
          fieldType: "FormField11",
          name: "表单名字11",
          type: "check",
          check: ["选项1", "选项2", "选项3"],
          checkValue: [],
          readOnly: false,
          required: false
        },
        {
          fieldType: "FormField12",
          name: "表单名字12",
          type: "date",
          value: "2018-09-07",
          readOnly: true,
          required: true
        },
        {
          fieldType: "FormField13",
          name: "表单名字13",
          type: "date",
          value: "",
          readOnly: false,
          required: true
        },
        {
          fieldType: "FormField14",
          name: "表单名字14",
          type: "date",
          value: "",
          readOnly: false,
          required: false
        }
      ]
    };
  },
  methods: {
    submit() {
      let that = this;
      this.forEach(that);
      console.log(this.form);
    },
    forEach(that) {
      // console.log(that.form[10].checkValue.length)
      for (let i = 0; i < that.form.length; i++) {
        if (that.form[i].required) {
          if (
            that.form[i].value ||
            that.form[i].optionValue ||
            that.form[i].radioValue ||
            (that.form[i].checkValue && that.form[i].checkValue.length > 0)
          ) {
          } else {
            console.log(`第${i}项没填`);
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
      line-height: 0.8rem;
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