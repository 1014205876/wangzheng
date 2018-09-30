<template>
  <div class="form">
    
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      form: [
        {
          fieldType: "FormField",
          // id: "appointTime",
          // layout: null,
          name: "最终预约时间",
          // overrideId: true,
          // placeholder: "dayTime",
          readOnly: false,
          required: true,
          type: "dayTime",
          value: ""
        },
      ]
    };
  },
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
