<template>
    <div class="swiper">
        <!--            轮播图部分，使用mint框架的mt-swipe，Swiper是移动端的网页触摸滑动JS插件-->
        <mt-swipe :auto="3000" :speed="500">
            <mt-swipe-item v-for="(item,index) in lunboList" :key="index">
                <!--                    src属性不能直接写item.img否则会认为是一个本地的URL地址，需添加v-bind来当做表达式对item对象的数据进行判断-->
                <img :src="item.img" :class="{'fullwidth':isFullWidth}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props:["lunboList","isFullWidth"]//用来接收从父组件传递的参数,isFullWidth用来接收父组件是否需要图片宽度为100%，false时宽度自适应且居中，用以美化商品信息轮播和首页轮播图
    }
</script>

<style scoped>
    .swiper{
        height:220px;
        text-align: center;
    }
    .swiper img{
        height:100%;
    }
    .fullwidth{
        width: 100%;
    }
</style>