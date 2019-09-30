<template>
    <router-view />
</template>

<script>

    import appAdmin from "./layout/admin";
    export default {
        name: "App",
        components: {
            appAdmin
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