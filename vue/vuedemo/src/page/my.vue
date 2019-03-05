<template>
    <div class="my">
        我的页面
        <button @click='todrag'>拖拽页面</button>
        <br />
        <input type="file" accept="image/*;" style='display' id='file'>
        <button onclick="document.getElementById('file').click()">上传</button>
        <br />
        <input type="file" accept="image/*" capture="camera" style='display' id='camera'>
        <button onclick="document.getElementById('camera').click()">拍照</button>
        <br />
        <!-- capture=camcorder，调用手机摄像功能 -->
        <input type="file" accept="video/*" style='display' id='camcorder'>
        <button onclick="document.getElementById('camcorder').click()">摄像</button>
        <br />
        <!-- capture=microphone，调用手机录音功能 -->
        <input type="file" accept="audio/*" style='display' id='microphong'>
        <button onclick="document.getElementById('microphong').click()">录音</button>
        <br />
        <input type="file" accept="image/*" multiple>
        <picker :organization="organization" v-model="seleted"></picker>
        <el-select v-model="form.level" placeholder="请选择" @change='con(form.level)'>
            <el-option label="a" value="-1">A</el-option>
            <el-option label="b" value="0">B</el-option>
            <el-option label="c" value="1">C</el-option>
            <el-option label="d" value="2">D</el-option>
        </el-select>
        <!-- <button @click='con([value])'></button> -->
    </div>
</template>

<script>
    import Navfootr from "@/components/Nav";
    import Picker from "@/components/picker";
    export default {
        name: "My",
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                form:{level:''},
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
        methods: {
            todrag() {
                this.$router.push({
                    path: "/drag"
                });
            },
            con(arr) {
                console.log(arr)
            }
        }
    };
</script>

<style scoped>
    button {
        display: block;
        padding: 0.2rem;
        margin: 0.2rem;
    }
</style>