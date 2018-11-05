<template>
  <div>
    <div class="component">
      <div class="box">
        <div class="btn" @click='chakan'>查看</div>
        <div class="btn" @click='fatherremove'>删除</div>
        <!-- <div class="btn" @click='add(list,index)'>添加</div> -->
        <div style='clear:both'></div>
      </div>
      <div style='clear:both'></div>
      <div class='main' v-if='list.type=="component"'>
        <div v-show='list.show'>拖拽位置</div>
        <components v-for='(list,index) in list.form' :key='list.id' v-bind:list='list' v-bind:index='index' @index='remove'
          @look='look'></components>
      </div>
      <input v-if='list.type=="input"' type="text">
    </div>
    <div v-show='list.show'>拖拽位置</div>
  </div>
</template>

<script>
  export default {
    name: "components",
    props: ["list", "index"],
    data() {
      return {};
    },

    methods: {
      fatherremove() {
        this.$emit('index', this.index);
      },
      chakan() {
        this.$emit('look', this.index);
      },
      remove(index) {
        console.log(this.list)
        this.list.form.splice(index, 1);
      },
      look(index) {
        console.log(this.list)
        console.log(index)
      }
    },
    created() {
      this.list['mouse'] = false;
      this.list['show'] = false;
    }
  };
</script>

<style lang="less" scoped>
  .component {
    margin: 5px;
    border: 1px solid #000;
    border-radius: 5px;

    .box {
      float: right;

      .btn {
        float: left;
        padding: 5px;
        margin: 2px;
        background: skyblue;
        color: #fff;
      }
    }

    .main {
      margin: 5px;

    }

    input {
      background: red;
    }
  }
</style>