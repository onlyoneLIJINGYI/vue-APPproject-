<template>
    <div class="goodsinfo-container">
<!--        商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <Swiper :lunboList="goodsImgs" :isFullWidth="false"></Swiper>
                </div>
            </div>
        </div>
<!--        商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="price">
                        市场价：<del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;<span class="sellprice">销售价：￥{{goodsInfo.sell_price}}</span>
                    </div>
                    <div>购买数量:
<!--                        购买数量最大值应该为商品的库存量，而库存量是通过get请求获取的数据，数据获取的时间不确定很可能在HTML元素渲染结束之后还没有获取到，
因此不能讲库存量的值通过v-bind形式绑定到data-numbox-max属性上可以通过watch属性监听数据当数据获取到之后将其赋值给numbox上的最大值-->
                    <div class="mui-numbox" data-numbox-min='1'>
                        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                        <input id="test" class="mui-input-numbox" type="number" value="1"  @change="numbox($event)" />
                        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                    </div>
                    </div>
                    <div class="button">
                        <mt-button type="primary" size="small">立即购买</mt-button>&nbsp;&nbsp;
                        <mt-button type="danger" size="small" @click="addShopCart">加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>
        <!--        商品信息区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsInfo.add_time|dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goGoodsDesc(goodsid)">图文介绍</mt-button>
            </div>
            <div class="mui-card-footer">
                <mt-button type="danger" size="large" plain @click="goGoodsComment(goodsid)">商品评论</mt-button>
            </div>
        </div>
<!--        加入购物车的动画-->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="animateFlag"></div>
        </transition>
    </div>
</template>

<script>
    import $ from 'jquery'
    import mui from '../../lib/mui/js/mui.min.js'
    import Swiper from '../subComponents/Swiper.vue'//导入轮播组件
    export default {
        data(){
            return{
                goodsid:this.$route.params.id,
                goodsImgs:[],
                goodsInfo:{},
                animateFlag:false,
                addnum:1,
                stock_quantity:''//商品库存量
            }
        },
        created() {
            this.getGoodsImgs();
            this.getGoodsInfo();
        },
        mounted(){
            //初始化数字按钮框，否则JS事件不能生效，该初始化要在mounted生命周期函数中带HTML元素渲染完毕根据类名获取对应的元素节点
          mui('.mui-numbox').numbox();
          //console.log(this.goodsInfo.stock_quantity)//使用:data-numbox-max='goodsInfo.stock_quantity'返回undefined
        },
        watch:{//监听属性
            //stock_quantity数据发生变化watch会监听到其改变然后将其值设置为mui框架中numbox组件的数字最大值
            stock_quantity:function (newVal,oldVal) {
                mui('.mui-numbox').numbox().setOption('max',newVal);
            }
        },
        methods:{
            getGoodsImgs(){
                this.$http.get('api/getthumimages/'+this.goodsid).then(result=>{
                    if(result.body.status===0){
                        //因为获取的图片要放到轮播图组件中，轮播组件显示的是item.img属性因此要修改当前列表中的src属性为img属性
                        result.body.message.forEach(item=>{
                            item.img=item.src;
                        })
                        this.goodsImgs=result.body.message
                    }else{
                        console.log("请求失败")
                    }
                })
            },
            getGoodsInfo(){
                this.$http.get('api/goods/getinfo/'+this.goodsid).then(result=>{
                    if(result.body.status===0){
                        this.goodsInfo=result.body.message[0];
                        this.stock_quantity=result.body.message[0].stock_quantity//数据获取到就将库存值赋给stock_quantity这个数据
                    }else{
                        console.log("请求失败")
                    }
                })
            },
            goGoodsDesc(id){
                this.$router.push('/home/goodsDesc/'+id);
            },
            goGoodsComment(id){
                this.$router.push('/home/goodsComment/'+id);
            },
            numbox(e){//使用change事件来监听numbox输入框值的改变，+和—按钮改变value值也能够触发change事件，而使用v-model动态绑定，watch来监听不能监听到+和—按钮导致value值的变化
                this.addnum=parseInt(e.target.value);
            },
            addShopCart(){//将商品添加到购物车
/*
                添加购物车需要获取选中的商品数量，数字box放在当前组件上直接获取即可，如果将其拿出来作为一个子组件需要子组件向父组件传参，
                具体实现方法：子组件上使用change事件来监听输入框值的变化，每当数字改变就通过imit触发方法来传递参数将值传给父组件，可查看Vueday11学习资料day10视频的13节课的视频
*/
                this.animateFlag=!this.animateFlag//改变动画标志改为true即动画开始

                //要加入购物车当中的商品对象，通过使用Vuex store中的方法将商品对象加入state中的cart数组中，如果cart数组中已经包含当前商品则只更新商品数量
                var goodsObj={id:this.goodsid,count:this.addnum,price:this.goodsInfo.sell_price,selected:false};
                var _this=this;

                setTimeout(function () {//设置定时器当动画0.7s结束时触发store中的addToCart方法cart数组值变化了就会getters里的getCartCount就会重新计算购物车商品数量，购物车标志数字会立即更新
                    _this.$store.commit('addToCart',goodsObj);
                },700)
            },
            //半场动画函数
            beforeEnter(el){
               el.style.transform="translate(0,0)"//初始化小球开始动画之前的位置
            },
            enter(el,done){
                el.offsetWidth;
                /*设置动画完成之后的位置，该位置的坐标不能写死，应根据实际情况及手机端型号和分辨率的变化动态计算坐标值，
                获取初始位置上的元素节点和结束位置元素节点距离页面的距离差值即获得相对位置*/
                const ballPosition=$('.ball').offset();//获取小球在页面的位置
                const badgePosition=$('#badge').offset();//获取购物车图标在页面的位置
                const xlength=badgePosition.left-ballPosition.left;
                const ylength=badgePosition.top-ballPosition.top;
                el.style.transform=`translate(${xlength}px,${ylength}px)`;//使用es6的模板字符串当中引入变量
                el.style.transition="all 0.7s cubic-bezier(.62,-0.1,.29,.85)"
                //el.style.animation="center1 1s ease-in forwards";
                done()
            },
            afterEnter(el){
                this.animateFlag=!this.animateFlag
            }
        },
        components:{
            Swiper
        }
    }
</script>

<style scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
}
.price{
    line-height: 40px;
}
.price .sellprice{
        color: red;
        font-size:14px;
        font-weight: bold;
}
.button{
    margin: 10px 10px;
}
.ball{
    position: absolute;
    left: 142px;
    top:420px;
    z-index: 99;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
}
@keyframes center1 {
    to{transform: translateX(95px)}
}
</style>