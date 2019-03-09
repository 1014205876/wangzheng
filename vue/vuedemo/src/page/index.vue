<template>
    <div class='index'>
        <!-- banner轮播 -->
        <div class="banner">
            <div class="swiper-container" id='swiper01'>
                <!--轮播-->
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="list in 3" :key='list.id'>
                        <a href="###">
                            <img src="/static/img/videoimg.png" alt="" />
                        </a>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <!-- 贷款平台 -->
        <ul class="daikuan">
            <li v-for='item in daikuan' :key='item.id' v-on:click='toApply(item)'>
                <div class="top">
                    <img :src="item.logo" alt="" class="logo">
                    <div class="name">{{item.name}}</div>
                    <button>立即申请</button>
                </div>
                <div class="main">
                    <div>
                        <span class="quota">
                            {{item.minQuota}}-{{item.maxQuota}}万
                        </span>
                        <span>
                            {{item.minTerm}}-{{item.maxTerm}}个月
                        </span>
                    </div>
                    <div>
                        <span>申请额度</span>
                        <span>
                            {{item.minRate}}%-{{item.maxRate}}%
                        </span>
                    </div>
                </div>
                <div class="bottom">{{item.introduction}}</div>
            </li>
        </ul>
        <!-- 底部导航 -->
        <!-- <nav-footr :active="'0'"></nav-footr> -->
    </div>
</template>

<script>
    // 引入swiper
    // import Swiper from "swiper";
    // import "swiper/dist/css/swiper.min.css";
    // 引入导航组件
    import Navfootr from "@/components/Nav";

    export default {
        name: "Index",
        data() {
            return {
                daikuan: [
                    {
                        logo: "/static/img/index.png",
                        name: "征信贷",
                        minQuota: 10,
                        maxQuota: 50,
                        minTerm: 1,
                        maxTerm: 12,
                        minRate: 1.25,
                        maxRate: 1.5,
                        introduction:
                            "产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍"
                    },
                    {
                        logo: "/static/img/index.png",
                        name: "企业信用卡",
                        minQuota: 20,
                        maxQuota: 100,
                        minTerm: 1,
                        maxTerm: 12,
                        minRate: 1.25,
                        maxRate: 1.5,
                        introduction:
                            "产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍"
                    },
                    {
                        logo: "/static/img/index.png",
                        name: "房抵债",
                        minQuota: 20,
                        maxQuota: 50,
                        minTerm: 1,
                        maxTerm: 12,
                        minRate: 1.25,
                        maxRate: 1.5,
                        introduction:
                            "产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍"
                    },
                    {
                        logo: "/static/img/index.png",
                        name: "房抵债",
                        minQuota: 20,
                        maxQuota: 50,
                        minTerm: 1,
                        maxTerm: 12,
                        minRate: 1.25,
                        maxRate: 1.5,
                        introduction:
                            "产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍"
                    },
                    {
                        logo: "/static/img/index.png",
                        name: "房抵债",
                        minQuota: 20,
                        maxQuota: 50,
                        minTerm: 1,
                        maxTerm: 12,
                        minRate: 1.25,
                        maxRate: 1.5,
                        introduction:
                            "产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍"
                    }
                ]
            };
        },
        components: {
            navFootr: Navfootr
        },
        methods: {
            toApply(item) {
                this.$router.push({
                    path: "/apply",
                    query: {
                        name: item.name,
                        minQuota: item.minQuota,
                        maxQuota: item.maxQuota
                    }
                });
                //  this.$router.push({path: 'xxx', query: {aaa: 1}})
            }
        },
        mounted() {
            console.log(new this.$swiper())
            var mySwiper01 = new this.$swiper("#swiper01", {
                pagination: {
                    //分页器X
                    el: ".swiper-pagination",
                    clickable: true
                },
                grabCursor: true,//抓取手势
                autoplay: {
                    disableOnInteraction: false, //操作后继续轮轮播
                    delay: 2000 //秒切换一次
                },
                loop: true
            });
        }
    };
</script>
<style lang="less" scoped>
    .index {
        padding-bottom: 1rem;

        .banner {
            background: red;

            a {
                display: block;
                width: 100%;

                img {
                    width: 100%;
                }
            }
        }

        .daikuan {
            background: #f2f2f2;
            padding: 10px;

            li {
                background: #fff;
                margin-top: 10px;

                .top {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    padding: 5px 0px;

                    .logo {
                        width: 0.2rem;
                        height: 0.2rem;
                    }

                    button {
                        background: red;
                        color: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 3px;
                    }
                }

                .main {
                    border-top: 3px solid #f2f2f2;
                    border-bottom: 3px solid #f2f2f2;
                    padding: 5px 0px;

                    div {
                        display: flex;
                        justify-content: space-around;
                        padding: 5px 0px;

                        .quota {
                            font-size: 0.3rem;
                            font-weight: 600;
                            color: red;
                        }
                    }
                }

                .bottom {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
            }

            li:first-child {
                margin-top: 0;
            }
        }
    }
</style>