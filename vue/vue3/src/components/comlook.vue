<template>
  <div class='comlook'>
    <div class='components' v-if='form.type=="component"'>
      <div v-for='(list,index) in form.list' :key='list.id' :style='{width:(list.width/12*100+"%")}'>
        <comlook :form='list' :index='index' :mouse='mouse' :data='data' :placeindex='placeindex'></comlook>
      </div>
    </div>
    <div class='components' v-if='form.type=="table"'>
      <div v-for='(list,index) in form.list' :key='list.id' :style='{width:(list.width/12*100+"%")}' v-show='index==form.index'>
        <comlook :form='list' :index='index' :mouse='mouse' :data='data' :placeindex='placeindex'></comlook>
      </div>
    </div>
    <div v-if='form.type=="input"'>
      <span v-if='form.form.required' style='color:red'>*</span>
      <input type="text" :placeholder='form.form.placeholder' :readonly="form.form.readOnly" v-model='form.form.value'>
      {{form.form.name}}
    </div>
    <div v-if='form.type=="number"'>
      <!-- <span v-if='form.form.required' style='color:red'>*</span> -->
      <input type="number" :min='form.form.min' :max='form.form.max' :placeholder='form.form.placeholder' :required="form.form.required" :readonly="form.form.readOnly" v-model='form.form.value'>
      {{form.form.name}}
    </div>
    <div v-if='form.type=="date"'>
      <span v-if='form.form.required' style='color:red'>*</span>
      <input type="date" :min='form.form.min' :max='form.form.max' :placeholder='form.form.placeholder' :readonly="form.form.readOnly" v-model='form.form.value'>
      {{form.form.name}}
    </div>
    <div v-if='form.type=="radio"'>
      {{form.form.name}}
      <div class='form' v-for='item in form.form.options' :key='item.id'>
        <label class='radio'>
          <input type='radio' :value='item.value' v-model='form.form.value'>{{item.name}}
          <div class="after"></div>
        </label>
      </div>
    </div>
    <div v-if='form.type=="checkbox"'>
      {{form.form.name}}
      <div class='form' v-for='item in form.form.options' :key='item.id'>
        <label class='checkbox'>
          <input type='checkbox' :value='item.value' v-model='form.form.value'>{{item.name}}
          <div class="after"></div>
        </label>
      </div>
    </div>
    <div v-if='form.type=="title"'>
      <div :style='form.form.style' style='white-space:pre-wrap'>{{form.form.value}}</div>
    </div>
    <div v-if='form.type=="editor"'>
        <div v-html='form.form.div'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comlook",
  props: ["form", "index", "mouse", "data", "placeindex"],
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style lang="less" scoped>
.comlook {
  .components {
    -moz-box-sizing: border-box;
    /*Firefox3.5+*/
    -webkit-box-sizing: border-box;
    /*Safari3.2+*/
    -o-box-sizing: border-box;
    /*Opera9.6*/
    -ms-box-sizing: border-box;
    /*IE8*/
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>