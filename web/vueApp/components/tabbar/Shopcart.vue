<template>
    <div class="shopcart-container">
<!--        购物车商品列表区域-->
        <div class="goods-list" v-for="(item,index) in cartlist" :key="item.id">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedGoods($store.getters.getGoodsSelected[item.id],item.id)"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <p>{{item.title}}</p>
                            <span class="price">￥{{item.sell_price}}</span>
                            <div class="mui-numbox" data-numbox-min='1'>
                                <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
<!--                                该输入框的值表示加购的商品数量应与store中的数据同步，-->
                                <input id="test" class="mui-input-numbox" type="number" :value="$store.getters.getGoodsCount[item.id]" readonly @change="updateGoodsCount($event,item.id)" />
                                <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                            </div>
                            <span><a href="#" @click.prevent="delGoods(item.id,index)">删除</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<!--        结算区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="info">
                        <p>总计:</p>
                        <p>已勾选商品<span class="red-font">{{$store.getters.calCartAmount.totalcount}}</span>件，总价<span class="red-font">￥{{$store.getters.calCartAmount.totalmoney}}</span></p>
                    </div>
                    <mt-button type="danger">结 算</mt-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import $ from 'jquery'
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        data(){
            return{
                cartlist:[],//存放购物车商品数据
            }
        },
        created() {
            this.getCartList()
        },
        updated(){
            //初始化数字按钮框，否则JS事件不能生效，该初始化要在updated生命周期函数中,待购物车数据获取到重新渲染页面v-for生效才能使所有数字按钮框生效
            mui('.mui-numbox').numbox();
            //console.log(this.goodsInfo.stock_quantity)//使用:data-numbox-max='goodsInfo.stock_quantity'返回undefined
        },
        methods:{
            getCartList(){
                //从store中获得cart数据获得购物车中商品ID拼接成商品ID数组
                var goodsid=[];
                this.$store.state.cart.forEach(item=>{
                    goodsid.push(item.id)
                })
                //如果购物车为空就直接退出该方法
                if(goodsid.length<=0) return;
                //通过传递商品ID请求获得购物车中商品的数据，多个商品ID用‘,’号分割传递参数
                this.$http.get('api/goods/getshopcarlist/'+goodsid.join(',')).then(result=>{
                    //该请求方法返回的数据顺序是按商品ID升序
                    if(result.body.status===0){
                        this.cartlist=result.body.message
                    }
                })
            },
            //numboxchange事件触发的方法，将选框的值和商品ID封装成对象传递给store上的updateGoodsCount方法对cart中商品数量进行更新
            updateGoodsCount(e,goodsid){
                var goodscount=parseInt(e.target.value);
                var goodsObj={id:goodsid,count:goodscount};
                this.$store.commit('updateGoodsCount',goodsObj);
            },
            delGoods(goodsid,index){
                console.log(goodsid)
                this.cartlist.splice(index,1);
                this.$store.commit('delGoods',goodsid)
           },
            //mt-switch组件的change回调函数用来改变store中商品selected属性值，第一个参数返回的是组件的值开为true，关为false，
            selectedGoods(selectedFlag,goodsid){
                var goodsObj={id:goodsid,selected:selectedFlag};
                this.$store.commit('updateGoodsSelected',goodsObj);
            }
        }
    }
</script>

<style scoped>
    * { touch-action: none; }
.shopcart-container{
    background-color: #eee;
    overflow: hidden;
}
.shopcart-container img{
    width: 50px;
    height: 50px;
}
.shopcart-container .mui-card-content-inner{
    display: flex;
    justify-content: space-between;
    align-items: center;/*垂直居中*/
}
.shopcart-container .mui-card-content-inner .price{
    color: #c00404;
}
.shopcart-container .mui-card-content-inner .mui-numbox{
    height: 25px;
}
 .shopcart-container .mui-card-content-inner .red-font{
     color: #c00404;
}
</style>