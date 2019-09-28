<template>
    <div>
<!--  头部滚动条，使用mui框架的tab-top-webview-main模板-->
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
<!--                “全部”分类显示所有的图片请求id为0-->
                <a class="mui-control-item mui-active"  @click="getImages(0)">
                    全部
                </a>
                <a class="mui-control-item" v-for="item in categoryList" :key="item.id" @click="getImages(item.id)">
                    {{item.title}}
                </a>
            </div>
        </div>
<!--        图片懒加载 -->
        <ul class="photo-list">
            <li v-for="item in imgList" :key="item.id">
                <router-link v-bind:to="'/home/photoInfo/'+item.id">
                    <img v-lazy="item.img_url">
                    <div class="img-info">
                        <div class="title">{{item.title}}</div>
                        <div class="content">{{item.zhaiyao}}</div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    //导入的js 文件中'caller', 'callee', and 'arguments'这些属性在严格模式下不能正常解析，因此借用插件去除严格模式cnpm install babel-plugin-transform-remove-strict-mode -D
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        data(){
            return{
                categoryList:[],
                imgList:[]
            }
        },
        created(){
            this.getImgCategory();
            this.getImages(0)
        },
        mounted(){//生命周期函数，当组件中DOM结构被渲染好放到页面中后执行的钩子函数，否则下面初始化滑动控件获取不到.mui-scroll-wrapper这个元素，初始化效果无法实现
            //初始化scroll控件需要放到mounted生命周期函数中,这样图片分享的头部才能滑动
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods:{
            getImgCategory(){
                this.$http.get('api/getimgcategory').then(result=>{
                    if(result.body.status===0){
                        this.categoryList=result.body.message
                    }else{
                        console.log("请求失败")
                    }
                })
            },
            getImages(cateid){//根据分类号获取对应的图片
                this.$http.get('api/getimages/'+cateid).then(result=>{
                    if(result.body.status===0){
                        this.imgList=result.body.message
                    }else{
                        console.log("请求失败")
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .photo-list{
        margin: 0;
        padding:10px;
        list-style: none;
    }
    .photo-list li{
        position: relative;
        margin-bottom:10px;
        background-color: #ccc;
        text-align: center;
        box-shadow: 0 0 6px #999;
    }
    .photo-list img {
        width: 100%;
        /*vertical-align 属性设置元素的垂直对齐方式,把此元素放置在父元素的中部*/
        vertical-align: middle;
    }
    /*懒加载图标的样式*/
    .photo-list img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
    .photo-list .img-info{
        position: absolute;
        bottom:0px;
        padding: 0 5px;
        max-height: 105px;
        background-color: rgba(0,0,0,0.5);
        text-align: left;
        font-size: 13px;
        color:white;
    }

</style>