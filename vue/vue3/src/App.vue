<template>
  <el-container>
    <el-aside>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </el-aside>
    <el-container>
      <el-header>
        <appHeader />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>

  import appHeader from "./layout/header";
  export default {
    name: "App",
    components: {
      appHeader
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>