<template>
    <div class="home-container">
        <!--            轮播图部分，使用mint框架的mt-swipe，Swiper是移动端的网页触摸滑动JS插件-->
        <Swiper :lunboList="lunboList" :isFullWidth="true"></Swiper>
        <!--六宫格列表，使用的是mui框架的grid default-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/news">
                <img src="../../../images/home/menu1.png">
                <div class="mui-media-body">新闻咨询</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photoShare">
                <img src="../../../images/home/menu2.png">
                <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodsList">
                <img src="../../../images/home/menu3.png">
                <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../../images/home/menu4.png">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../../images/home/menu5.png">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../../images/home/menu6.png">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>

<script>
    import Swiper from '../subComponents/Swiper.vue'//导入轮播组件
    import {Toast} from 'mint-ui'//导入消息提示框  
    export default {
        data(){
            return{
                lunboList:[]
            }
        },
        created(){
            this.getlunbo()//在created生命周期函数中调用getlunbo方法来获取轮播图列表信息
        },
        methods:{
            getlunbo(){
                this.$http.get('api/getlunbo').then(result=>{
                    if(result.body.status===0){
                        this.lunboList=result.body.message
                        //Toast("轮播图加载成功")
                    }else{
                        Toast("轮播图加载失败")//消息提示框
                    }
                })
            }
        },
        components:{
            Swiper
        }
    }
</script>

<style scoped>
.swiper{
    height:220px;
}
.swiper img{
    height:100%;
    width: 100%;
}
.mui-table-view img{
    width:60px;
    height:60px;
}
.mui-grid-view.mui-grid-9{
    background-color: #ffffff;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: none;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
    font-size: 13px;
}
</style>