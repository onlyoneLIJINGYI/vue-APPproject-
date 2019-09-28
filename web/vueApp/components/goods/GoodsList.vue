<template>
    <div class="goods-list">
        <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goGoodsInfo(item.id)">
            <img :src="item.img_url">
            <p class="title">{{item.title}}</p>
            <div class="content">
                <div class="price">
                    <span class="now">￥{{item.market_price}}</span>
                    <span class="old">￥{{item.sell_price}}</span>
                </div>
                <div class="describe">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                pageindex:1,
                goodsList:[]
            }
        },
        created() {
            this.getGoodsList()
        },
        methods:{
            getGoodsList(){
                this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
                    if (result.body.status === 0) {
                        this.goodsList =this.goodsList.concat(result.body.message)
                    } else {
                        console.log("请求失败")
                    }
                })
            },
            getMore(){
                this.pageindex++;
                this.getGoodsList()
            },
            goGoodsInfo(id){//使用编程式导航进入对应的商品详情页，除了使用 <router-link> 创建 a 标签来定义导航链接，还可以借助 router 的实例方法，通过编写代码来实现
                //区分this.$route和this.$router两个对象，route表示当前正在用于跳转的路由器对象，可以获取路由参数，调用其name、path、query、params等方法;router表示全局路由器对象，项目中通过router路由参数注入路由之后，在任何一个页面都可以通过此方法获取到路由器对象，并调用其push(), go()等方法
                this.$router.push('/home/goodsInfo/'+id)//使用$router.push方法传递一个路由地址


            }
        }
    }
</script>

<style scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;/*弹性盒元素在必要的时候换行*/
    justify-content: space-between;
    padding:10px;
}
.goods-list .goods-item{
    display: flex;
    flex-direction: column;/*将商品该弹性盒元素方向改为纵向项目垂直显示，使用space-between就会使图片和content分别始终位于头部和底部*/
    justify-content: space-between;
    margin: 5px 0;
    padding:2px;
    width: 49%;
    box-shadow: 0 0 5px #999;
    border-radius: 3px;
    font-size: 13px;
}
.goods-list .goods-item img{
    margin: 10px auto;
    width: 90%;
}
.goods-list .goods-item .title{
    margin:0;
    padding-left: 5px;
    font-size: 14px;
    color:black;
}
.goods-list .goods-item .content{
    padding:3px;
    background-color: #eee;
}
.goods-list .goods-item .price .now{
    color: #dd524d;
    font-size: 14px;
    font-weight: bold;
}
.goods-list .goods-item .price .old{
    color: dimgray;
    text-decoration: line-through;
}
.goods-list .goods-item .describe{
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    color: #757373;
}
</style>