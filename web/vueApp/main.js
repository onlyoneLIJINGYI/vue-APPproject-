//import Vue from 'vue'
import Vue from '../../node_modules/vue/dist/vue.js'
import VueRouter from 'vue-router'//导入路由功能的包
Vue.use(VueRouter)//安装启用路由

//导入vue-resource包
import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置请求地址的根路径，之后的请求都会使用该根路径进行拼接，避免之后地址发生变化要去组件或页面中进行修改
Vue.http.options.root="http://www.liulongbin.top:3005/"
Vue.http.options.emulateJSON=true//全局设置post请求表单数据格式的组织形式

//导入vue-preview插件，实现图片缩略图的效果
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入Vuex包Vuex用来保存共享数据，data用来存放组件或实例内部私有数据，props存放父组件传递的数据，安装Vuex npm i vuex -S
import Vuex from 'vuex'
Vue.use(Vuex)

import './lib/mui/css/mui.min.css'//导入mui样式
import './lib/mui/css/icons-extra.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'//导入mint-UI的CSS样式
Vue.use(MintUI)
import app from './App.vue'//导入App组件
import router from './router.js'//导入路由配置文件
import moment from 'moment'//导入moment插件对时间进行格式化
//定义全局过滤器使时间格式化
Vue.filter('dateFormat',function (dateStr,pattern="YYYY-MM-DD HH:mm:ss") {
    return moment(dateStr).format(pattern)//对指定时间dataStr进行格式化，按照pattern模板进行格式化
})
//获取本地存储中的cart数据赋给state中的cart，这样每次进入网站都能够获得之前购物车的数据
var localCart=JSON.parse(localStorage.getItem('cart')||'[]')
//new Vuex.Store()实例，创建一个数据仓储对象,并将其挂载到VM实例中，全局可用
var store=new Vuex.Store({
    state:{//相当于组件中的data，其他组件想要访问store中的数据，可以使用$store.state.数据名 来获取
        cart:localCart//存放购物车的数据商品信息的对象{id:商品ID,count:购买商品数量,price:商品单价,selected:是否被选中}
    },
    mutations:{
      //当组件要操作修改store中的数据时只能通过调用mutations提供的方法来操作数据，便于对store中数据的管理后续方便修改，且方法只能传两个参数第一位参数必须为state，想要传递多个参数可以通过对象来传递
       // 如果组件要调用方法使用this.$store.commit('mutations中的方法名')
       addToCart(state,goodsObj){
           //将加购的商品信息加入store的cart数组中，当前数组中如果包含要加购的商品则只更新商品数量
           var flag=false;//用来标识当前购物车中是否含有加购的商品
           state.cart.some(item=>{//some方法检测数组中是否含有满足条件的元素有一个元素满足条件返回true其他不再检测，没有满足条件的元素则返回false
               if(item.id==goodsObj.id){
                   item.count+=parseInt(goodsObj.count);
                   flag=true //设置为true表示找到了购物车中存在该商品
                   return true
               }
           })
           if(!flag){//flag为false则将商品对象放入cart数组中
               state.cart.push(goodsObj);
           }
           //将更新过后的cart数组存储到本地的localstorage中避免刷新页面购物车数据被清空
           localStorage.setItem('cart',JSON.stringify(state.cart))
       },
        updateGoodsCount(state,goodsObj){//根据传递的商品ID和商品数量参数修改购物车中商品数量，直接修改这是购物车页面numbox数值改变调用的函数
           state.cart.some(item=>{
               if(item.id==goodsObj.id){
                   item.count=parseInt(goodsObj.count);
                   return true
               }
           })
            //将最新的cart数组存储到本地的localstorage中避免刷新页面购物车数据被清空
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },
        delGoods(state,id){
           //array.some(function(currentValue,index,arr),thisValue),根据商品ID查找对应的商品元素根据当前下标删除商品数据
           state.cart.some((item,index)=>{
               console.log(id)
               console.log(index)
               if(item.id==id){
                   state.cart.splice(index,1)
                   return true
               }
           })
            //将最新的cart数组存储到本地的localstorage中避免刷新页面购物车数据被清空
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },
        updateGoodsSelected(state,goodsObj){//修改商品是否被选中的状态
           state.cart.some(item=>{
               if(item.id==goodsObj.id){
                   item.selected=goodsObj.selected;
                   return true
               }
           })
            //将最新的cart数组存储到本地的localstorage中避免刷新页面购物车数据被清空
            localStorage.setItem('cart',JSON.stringify(state.cart))
        }
    },
    getters:{//只负责对外提供数据，不能修改原数据，可对原数据进行包装，且当原数据变化时getters里的方法会重新计算出最新的结果，相当于计算属性和过滤器
        //访问getters中的方法：this.$store.getters.***
        getCartCount(state){//计算购物车当前商品的总数量
            var count=0;
            //遍历cart数组当中每个商品的加购数量累计求得购物车商品总数，只有数组中数据改变就会重新计算
            state.cart.forEach(item=>{
                count+=item.count
            })
            return count//一定要返回count值这样页面才能接收到结果
        },
        getGoodsCount(state){//获取购物车中每个商品加购的数量
            var goodscount=[];
            //循环cart中的每个商品项将加购的商品数量放入goodscount数组中以商品ID作为下标，这样购物车页面可以使用该方法根据商品ID获得对应的商品数量
            state.cart.forEach(item=>{
                goodscount[item.id]=item.count
            })
            //该方法返回goodscount数组
            return goodscount
        },
        getGoodsSelected(state){
            var goodsSelected=[];
            state.cart.forEach(item=>{
                goodsSelected[item.id]=item.selected;
            })
            return goodsSelected
        },
        calCartAmount(state){//计算购物车选中的商品总数和结算总价钱
            var cart={
                totalcount:0,
                totalmoney:0
        }
            state.cart.forEach(item=>{
                if(item.selected){
                    cart.totalcount+=item.count;
                    cart.totalmoney+=item.price*item.count;
                }
            })
            return cart
        }

    }
})

//vue实例
var vm2=new Vue({
    el:'#vueApp',
    data:{

    },
    render: c=>c(app),
    router,//将路由实例挂载在根实例上
    store:store
})
