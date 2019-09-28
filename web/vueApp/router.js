//配置路由的文件
import VueRouter from 'vue-router'
//导入需要配置路径的组件
import Home from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import Search from './components/tabbar/Search.vue'
import Shopcart from './components/tabbar/Shopcart.vue'
import News from './components/news/News.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoShare from './components/photoShare/photoShare.vue'
import PhotoInfo from './components/photoShare/photoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/GoodsComment.vue'

//创建路由对象，配置的是App组件中的路由
var router=new VueRouter({
    routes:[//路由路径的配置，
        {path:'/',redirect:'/home'},//根路径重定向到home页面下,每次项目运行都会定向到home路径显示首页的内容
        {path:'/home',component:Home},
        {path:'/member',component:Member},
        {path:'/search',component:Search},
        {path:'/shopcart',component:Shopcart},
        {path:'/home/news',component:News},
        {path:'/home/newsInfo/:id',component:NewsInfo},
        {path:'/home/photoShare',component:PhotoShare},
        {path:'/home/photoInfo/:id',component:PhotoInfo},
        {path:'/home/goodsList',component:GoodsList},
        {path:'/home/goodsInfo/:id',component:GoodsInfo},
        {path:'/home/goodsDesc/:id',component:GoodsDesc},
        {path:'/home/goodsComment/:id',component:GoodsComment}
    ],
    linkActiveClass:'mui-active'//定义<router-link>被点击时的样式
})
//把路由对象暴露出去，在main.js中导入
export default router