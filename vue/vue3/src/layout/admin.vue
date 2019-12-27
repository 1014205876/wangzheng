<template>
    <!-- <div>123</div> -->
    <el-container>
        <el-aside>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/drag">drag</router-link>
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
    import appHeader from "./header";
    export default {
        name: 'appAdmin',
        components: {
            appHeader
        }
    }
</script>

<style scoped>
</style>