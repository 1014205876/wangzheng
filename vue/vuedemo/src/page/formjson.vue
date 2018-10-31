<template>
  <div class="formjson">
    <ul>
      <li>
        id名<input type="text" name="" id="" v-model='form.id'>
      </li>
      <li>
        中文名<input type="text" name="" id="" v-model='form.name'>
      </li>
      <li>
        fieldType名<input type="text" name="" id="" v-model='form.fieldType'>
      </li>
      <li>
        required是否必填
        <label>
          是
          <input type="radio" :value='true' v-model='form.required'>
          <div class="after"></div>
        </label>
        <label>
          否
          <input type="radio" :value='false' v-model='form.required'>
          <div class="after"></div>
        </label>
      </li>
      <li>
        readOnly是否只读
        <label>
          是
          <input type="radio" :value='true' v-model='form.readOnly'>
          <div class="after"></div>
        </label>
        <label>
          否
          <input type="radio" :value='false' v-model='form.readOnly'>
          <div class="after"></div>
        </label>
      </li>
      <li>
        type类型
        <div v-for='list in form.types' :key='list.id'>
          <label>
            {{list.name}}
            <input type='radio' :value='list.type' v-model='form.type' @change='changetype(list.options)'>
            <div class="after"></div>
          </label>
        </div>
      </li>
      <li v-if='option'>
        <ul>
          <button v-on:click='add'>添加一组</button>
          <li v-for='(list,index) in options' :key='list.id' style='border:1px solid red;padding:5px;margin:5px;'>
            选项name<input type="text" v-model='list.name'><br>
            选项type<input type="text" v-model='list.type'><br>
            选项value<input type="text" v-model='list.value'><br>
            <button v-on:click='remove(index)'>删除</button>
          </li>
        </ul>
      </li>
      <li>
        default是否需要默认值
        <label>
          是
          <input type="radio" :value='true' v-model='needdefault'>
          <div class="after"></div>
        </label>
        <label>
          否
          <input type="radio" :value='false' v-model='needdefault'>
          <div class="after"></div>
        </label>
      </li>
      <li v-if='needdefault'>
        <div v-if='option'>
          选择框默认值
            <div v-for='list in options' :key='list.id'>
          <label v-if='form.type=="radio"'>
              {{list.name}}
              <input type='radio' :value='list.value' v-model='radiovalue'>
              <div class="after"></div>
          </label>
          <label v-if='form.type=="checkbox"'>
              {{list.name}}
              <input type='checkbox' :value='list.value' v-model='checkvalue'>
              <div class="after"></div>
          </label>
            </div>
          <select v-if='form.type=="select"' v-model='radiovalue'>
            <option v-for='list in options' :value="list.value" :key='list.id'>{{list.name}}</option>
          </select>
        </div>
        <div v-else>
          输入框默认值<input type="text" v-model='inputvalue'>
        </div>
      </li>
      <!-- <li>
        id名<input type="text" name="" id="" v-model='form.id'>
      </li> -->
      <button v-on:click='shengcheng'>生成json</button>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FormJson",
  data() {
    return {
      form: {
        id: "", //id名
        name: "", //中文名
        fieldType: "", //未知
        types: [
          {
            type: "input",
            name: "输入框",
            options: false
          },
          {
            type: "data",
            name: "时间框",
            options: false
          },
          {
            type: "textarea",
            name: "多行文本框",
            options: false
          },
          {
            type: "radio",
            name: "单选框",
            options: true
          },
          {
            type: "select",
            name: "下拉框",
            options: true
          },
          {
            type: "checkbox",
            name: "多选框",
            options: true
          }
        ],
        required: true, //必填
        readOnly: false, //禁用、只读
        type: ""
      },
      needdefault: false, //是否需要默认值
      inputvalue: [], //输入框默认值
      radiovalue: "", //单选框默认值
      checkvalue: [], //多选框默认值
      option: false, //是否需要选项
      options: [
        {
          name: "选项一",
          value: "01"
        },
        {
          name: "选项二",
          value: "02"
        }
      ]
      // fields: [
      //   {
      //     layout: null,
      //     name: "综合审查结论",
      //     overrideId: true,
      //     readOnly: false,
      //     id: "syntheticalapproveconclusion",
      //     placeholder: null,
      //     type: "text",
      //     fieldType: "FormField",
      //     value: null,
      //     required: true
      //   },
      //   {
      //     fieldType: "FormField",
      //     id: "appointTime",
      //     layout: null,
      //     name: "最终预约时间",
      //     overrideId: true,
      //     placeholder: "dayTime",
      //     readOnly: false,
      //     required: true,
      //     type: "dayTime",
      //     value: "2018-10-25 08:00:00"
      //   },
      //   {
      //     readOnly: false,
      //     type: "dropdown",
      //     required: true,
      //     layout: null,
      //     optionType: null,
      //     hasEmptyValue: true,
      //     name: "客户评级",
      //     overrideId: true,
      //     options: [
      //       {
      //         name: "一级",
      //         type: "clientRating",
      //         value: "firstRank"
      //       },
      //       {
      //         name: "二级",
      //         type: "clientRating",
      //         value: "secondRank"
      //       },
      //       {
      //         name: "三级",
      //         type: "clientRating",
      //         value: "thirdRank"
      //       },
      //       {
      //         name: "四级",
      //         type: "clientRating",
      //         value: "forthRank"
      //       },
      //       {
      //         name: "五级",
      //         type: "clientRating",
      //         value: "fifthRank"
      //       }
      //     ],
      //     id: "ratingResult",
      //     placeholder: null,
      //     optionsExpression: "${clientRating}",
      //     fieldType: "OptionFormField",
      //     value: "secondRank"
      //   },
      //   {
      //     fieldType: "FormField08",
      //     name: "表单名字08表单名字08表单名字08表单名字08表单名字08表单名字08",
      //     type: "check",
      //     options: [
      //       "选项1",
      //       "选项2",
      //       "选项3",
      //       "选项4",
      //       "选项5",
      //       "选项6",
      //       "选项7",
      //       "选项8",
      //       "选项9",
      //       "选项10"
      //     ],
      //     value: [],
      //     another: true,
      //     anotherValue: "",
      //     readOnly: false,
      //     required: true
      //   },
      //   {
      //     readOnly: false,
      //     type: "radio-buttons",
      //     required: true,
      //     layout: null,
      //     optionType: null,
      //     hasEmptyValue: null,
      //     name: "审批结果",
      //     overrideId: true,
      //     options: [
      //       {
      //         name: "通过",
      //         type: "loanApproveProposal",
      //         value: "getThrough"
      //       },
      //       {
      //         name: "不通过",
      //         type: "loanApproveProposal",
      //         value: "notPass"
      //       },
      //       {
      //         name: "通过，变更贷款建议",
      //         type: "loanApproveProposal",
      //         value: "passWithChange"
      //       }
      //     ],
      //     id: "syntheticalPassOrNot",
      //     placeholder: null,
      //     optionsExpression: "${loanApproveProposal}",
      //     fieldType: "OptionFormField",
      //     value: null
      //   },
      //   {
      //     layout: null,
      //     name: "备注",
      //     overrideId: true,
      //     readOnly: false,
      //     id: "approveRemark",
      //     placeholder: null,
      //     type: "multi-line-text",
      //     fieldType: "FormField",
      //     value: "",
      //     required: false
      //   }
      // ]
    };
  },
  watch: {},
  methods: {
    changetype(option) {
      this.option = option;
    },
    add() {
      let one = {
        name: "",
        type: "",
        value: ""
      };
      this.options.push(one);
    },
    remove(index) {
      this.options.splice(index, 1);
    },
    shengcheng() {
      let that = this;
      let json = {};
      // id: "", //id名
      // name: "", //中文名
      // fieldType: "", //未知
      // value: "", //初始值
      json["id"] = that.form.id;
      json["name"] = that.form.name;
      json["fieldType"] = that.form.fieldType;
      json["type"] = that.form.type;
      console.log(that.form);
    }
  }
};
</script>

<style lang="less" scoped>
input {
  background: skyblue;
}

label {
  display: flex;
  align-items: center;
  justify-content: space-around;

  .after {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .after:before {
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid red;
  }

  input {
    display: none;
  }

  input:checked + .after:before {
    background: red;
  }

  input:disabled + .after:before {
    background: blue;
  }

  input:disabled:checked + .after:before {
    background: green;
  }
}
</style>