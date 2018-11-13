<template>
  <div>
    <div class="component" @mouseover.self='mouseover' @mouseout.self='mouseout' @mouseup.self='add' @click.self='setup(form,$event)'>
      <div class="box" @mouseover='mouseover' @mouseout='mouseout' @mouseup='add' @click='setup(form,$event)'>
        <button class="btn" v-if='form.type!="component"'>设置</button>
        <button class="btn" @mousedown='move(form.type,$event,form);fatherremove()'>移动</button>
        <!-- <button class="btn" @click='fathercopy()'>复制</button> -->
        <button class="btn" @click='chakan'>查看</button>
        <button class="btn" @click='fatherremove'>删除</button>
        <div style='clear:both'></div>
      </div>
      <div style='clear:both'></div>
      <div class='place' v-if='form.type=="component"' v-show='form.show&&mouse&&placeindex==0' @mouseover.self='mouseover'
        @mouseout.self='mouseout' @mouseup.self='add'>生成位置</div>
      <div class='main' v-if='form.type=="component"' @mouseover.self='mouseover' @mouseout.self='mouseout'
        @mouseup.self='add' @click.self='setup(form,$event)'>
        <div class='com' v-for='(list,index) in form.list' :key='list.id' @mouseover.self='mouseover' @mouseout.self='mouseout'
          @mouseup.self='add' :style='{width:(list.width/12*100+"%")}'>
          <components :form='list' :index='index' :mouse='mouse' :data='data' :placeindex='placeindex'
            @index='remove' @copy='copy' @look='look' @typechange='move' @setup='setup'
             @mouseout.self='mouseout' @mouseup.self='add'></components>
          <div class='place' v-show='form.show&&mouse&&placeindex==index-0+1' @mouseover.self='mouseover'
            @mouseout.self='mouseout' @mouseup.self='add'>生成位置</div>
        </div>
      </div>
      <div v-if='form.type=="input"' @click='setup(form,$event)'>
        <div class='form'>
          <input type="text" v-model='form.form.key' :disabled='true'>唯一key值
        </div>
        <input v-if='form.type=="input"' type="text" :placeholder='form.form.placeholder' v-model='form.form.value'
          @click.self='setup(form,$event)'>
      </div>
      <div v-if='form.type=="radio"' @click='setup(form,$event)'>
        <div class='form'>
          <input type="text" v-model='form.form.key' :disabled='true'>唯一key值
        </div>
        <div class='form' v-for='item in form.form.options' :key='item.id'>
          <label class='radio'>
            <input type='radio' :value='item.value' v-model='form.form.value'>{{item.name}}
            <div class="after"></div>
          </label>
        </div>
      </div>
      <div v-if='form.type=="checkbox"' @click='setup(form,$event)'>
        <div class='form'>
          <input type="text" v-model='form.form.key' :disabled='true'>唯一key值
        </div>
        <div class='form' v-for='item in form.form.options' :key='item.id'>
          <label class='checkbox'>
            <input type='checkbox' :value='item.value' v-model='form.form.value'>{{item.name}}
            <div class="after"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入jq
import $ from "jquery";
export default {
  name: "components",
  props: ["form", "index", "mouse", "data", "placeindex"],
  data() {
    return {};
  },
  methods: {
    setup(list, e) {
      $(e.path[e.path.length - 7])
        .find(".component")
        .removeClass("active");
      $(e.path[0])
        .closest(".component")
        .addClass("active");
      this.$emit("setup", list, e);
    },
    move(type, e, list) {
      this.$emit("typechange", type, e, list);
    },
    fathercopy() {
      this.$emit("copy", this.form, this.index);
    },
    copy(list, index) {
      this.form.list.splice(index, 0, list);
    },
    chakan() {
      this.$emit("look", this.index);
    },
    fatherremove() {
      this.$emit("index", this.index);
    },
    remove(index) {
      this.form.list.splice(index, 1);
    },
    look(index) {
      console.log(this.form);
      console.log(index);
    },
    mouseover(e) {
      this.form.show = true;
    },
    mouseout() {
      this.form.show = false;
    },
    add(e) {
      if (this.mouse) {
        if (this.form.list) {
          this.form.list.splice(this.placeindex, 0, this.data);
          $(e.path[e.path.length - 7])
            .find(".component")
            .removeClass("active");
          // $(e.path[0])
          //   .closest(".component")
          //   .addClass("active");
        }
      }
    }
  },
  created() {
  }
};
</script>

<style lang="less" scoped>
.component {
  margin: 20px 0px 20px;
  padding: 0px 10px;
  border: 1px solid #000;
  border-radius: 5px;
  .place {
    margin: 10px;
  }

  .box {
    float: right;

    .btn {
      cursor: pointer;
      float: left;
      padding: 5px;
      margin: 2px;
      background: skyblue;
      color: #fff;
    }
  }
  .main {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    .com {
      -moz-box-sizing: border-box;
      /*Firefox3.5+*/
      -webkit-box-sizing: border-box;
      /*Safari3.2+*/
      -o-box-sizing: border-box;
      /*Opera9.6*/
      -ms-box-sizing: border-box;
      /*IE8*/
      padding: 0 10px;
    }
  }
  input {
    background-color: violet;
    display: block;
  }

  label {
    display: flex;
    align-items: center;
    // justify-content: space-around;

    .after {
      display: flex;
      align-items: center;
      justify-content: space-around;
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
  .radio {
    .after:before {
      content: "";
      width: 20px;
      height: 20px;
      border-radius: 20px;
      border: 1px solid red;
    }
  }
  .checkbox {
    .after:before {
      content: "";
      width: 20px;
      height: 20px;
      border-radius: 5px;
      border: 1px solid red;
    }
  }
}

.component.active {
  border: 2px dashed yellow;
  background: thistle;
}
</style>