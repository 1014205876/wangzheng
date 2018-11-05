<template>
  <!-- <div class="drag" @mousedown='mousedown'  @mouseover.stop='mouseover' @mouseout.stop='mouseout' @mouseup='mouseup'> -->
  <div class="drag">
    <button @click='totree'>模板页面</button>
    <div v-show='show' style='background:blue'>拖拽位置</div>
    <div v-for='(list,index) in form' :key='list.id'>
    <components v-bind:list='list' v-bind:index='index' @index='remove'></components>
    </div>
  </div>
  
</template>

<script>
// 引入布局组件
import components from "@/components/component";
export default {
  name: "Drag",
  components: {
    components
  },
  data() {
    return {
      mouse: false,
      show: false,
      form: [
        {
          type: "component",
          name: "一级组件01",
          form: [
            {
              type: "component",
              name: "二级组件01",
              form: [
                {
                  type: "component",
                  name: "三级组件01",
                  form: [
                    {
                      type: "input",
                      name: "四级组件01"
                    },
                    {
                      type: "input",
                      name: "四级组件02"
                    }
                  ]
                },
                {
                  type: "input"
                }
              ]
            },
            {
              type: "input"
            }
          ]
        },
        {
          type: "input",
          name: "一级组件02"
        }
      ]
    };
  },
  methods: {
    totree() {
      this.$router.push({
        path: "/tree"
      });
    },
    remove(index) {
      this.form.splice(index, 1);
    },
    mousedown() {
      this.mouse = true;
      this.show = false;
    },
    mouseover() {
      if (this.mouse) {
        this.show = true;
      }
    },
    // mousemove() {
    // },
    mouseout() {
      if (this.mouse) {
        this.show = false;
      }
    },
    mouseup() {
      this.mouse = false;
    }
  }
};
</script>

<style lang="less" scoped>
.drag {
  .component {
    margin: 5px;
    border: 1px solid #000;
    border-radius: 5px;
    .box {
      float: right;
      .btn {
        float: left;
        padding: 5px;
        background: skyblue;
        color: #fff;
      }
    }
    .main {
      margin: 5px;
    }
  }
}
</style>
