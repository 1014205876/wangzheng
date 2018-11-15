<template>
    <div>
        <div ref="editor" style="text-align:left"></div>
        <button v-on:click="getContent">查看内容</button>
    </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "editor",
  data() {
    return {
      value: ""
    };
  },
  methods: {
    getContent: function() {
      console.log(this.value);
      this.$emit("changeeditor", this.value);
    }
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    editor.customConfig.onchange = html => {
      this.value = html;
    };
    editor.create();
  }
};
</script>

<style scoped>
</style>