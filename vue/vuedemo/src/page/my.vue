<template>
  <div class="my">
    我的页面
    <br/>
    <input type="file" accept="image/*;" style='display' id='file'>
    <button onclick="document.getElementById('file').click()">上传</button>
    <br/>
    <input type="file" accept="image/*" capture="camera" style='display' id='camera'>
    <button onclick="document.getElementById('camera').click()">拍照</button>
    <br/>
    <!-- capture=camcorder，调用手机摄像功能 -->
    <input type="file" accept="video/*" style='display' id='camcorder'> 
    <button onclick="document.getElementById('camcorder').click()">摄像</button>
    <br/>
    <!-- capture=microphone，调用手机录音功能 -->
    <input type="file" accept="audio/*" style='display' id='microphong'>
    <button onclick="document.getElementById('microphong').click()">录音</button>
    <br/>
    <input type="file" accept="image/*" multiple>
    <picker :organization="organization" v-model="seleted"></picker>
  </div>
</template>

<script>
import Navfootr from "@/components/Nav";
import Picker from "@/components/picker";
export default {
  name: "My",
  data() {
    return {
      seleted: [],
      organization: [
        {
          value: "beijing",
          label: "北京"
        },
        {
          value: "shanghai",
          label: "上海"
        },
        {
          value: "shenzhen",
          label: "深圳"
        },
        {
          value: "hangzhou",
          label: "杭州"
        },
        {
          value: "zhengzhou",
          label: "郑州"
        },
        {
          value: "guangzhou",
          label: "广州"
        },
        {
          value: "xiamen",
          label: "厦门"
        }
      ]
    };
  },
  components: {
    navFootr: Navfootr,
    Picker
  },
  methods: {}
};
</script>

<style scoped>
button{
  display:block;
  padding:0.2rem;
  margin:0.2rem;
}
</style>
