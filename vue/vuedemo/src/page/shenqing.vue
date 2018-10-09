<template>
  <div class="shenqing">
    <button @click='back'>回去</button>
    <back></back>
    日历页面
    <button onclick="document.getElementById('date').click()">{{date?date:'请选择日期'}}</button>
    <input type="date" id='date' v-model='date'>
    <!-- <input type="date" id='date' v-model='date' style='display:block;width:0;height:0;padding:0;margin:0'> -->
    <button v-on:click='alert'>弹窗</button>
    <input type="text" v-model='remind'>
    <alert v-on:choice='choice' ref="alert" v-bind:remind="remind"></alert>
    <!-- <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate"></Calendar> -->
    <button v-on:click='picker'>滚动弹窗{{result1}}-{{result2}}</button>
    <picker v-model="visible" :data-items="items" @change="onValuesChange">
      <!-- <div class="top-content" slot="top-content">Top of the content.</div>
      <div class="bottom-content" slot="bottom-content">Bottom of the content.</div> -->
    </picker>
  </div>
</template>

<script>
// 引入返回组件
import Back from "@/components/back";
// 引入弹窗组件
import Alert from "@/components/alert";
// 引入jq
import $ from "jquery";
// 引入日历组件
import Calendar from "vue-calendar-component";
export default {
  name: "Shenqing",
  data() {
    return {
      date: "",
      remind: "弹窗提醒",
      visible: false,
      result1: "",
      result2: "",
      items: [
        {
          values: [
            "2000",
            "2001",
            "2002",
            "2003",
            "2004",
            "2005",
            "2006",
            "2007"
          ]
        },
        {
          values: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
          ]
        }
      ]
    };
  },
  components: {
    back: Back,
    Calendar,
    alert: Alert
  },
  methods: {
    back() {
      this.$router.push("/apply");
    },
    choice(choice) {
      if (choice == "no") {
        this.remind = `选择${choice}`;
      } else {
        this.remind = `选择是${choice}`;
      }
      this.$refs.alert.alertclose();
    },
    alert() {
      this.$refs.alert.alertshow();
    },
    picker() {
      this.visible = true;
    },
    onValuesChange(result1, result2) {
      this.result1 = result1;
      this.result2 = result2;
    }
  },
  created() {
    document.getElementById("titleId").innerHTML = "要设置的标题";
  },
  mounted() {
    $(".shenqing").css("min-height", $(window).height());
  },
  beforeRouteLeave(to, from, next) {
    if (this.date) {
      next();
    } else {
      next(confirm("确认离开么？"));
    }
  }
};
</script>

<style lang="less" scoped>
.shenqing {
  -moz-box-sizing: border-box; /*Firefox3.5+*/
  -webkit-box-sizing: border-box; /*Safari3.2+*/
  -o-box-sizing: border-box; /*Opera9.6*/
  -ms-box-sizing: border-box; /*IE8*/
  font-size: 0.3rem;
  button {
    display: block;
    width: 70%;
    padding: 5px;
    margin: 0.5rem auto;
    border-radius: 0.05rem;
  }
  input {
    display: block;
    width: 70%;
    padding: 5px;
    margin: 0.5rem auto;
    border-radius: 0.05rem;
  }
}
</style>
