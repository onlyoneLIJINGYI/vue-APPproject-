//组件入口，App作为主组件，其组件另外放到一个components的文件夹中
<template>
    <div class="app-container">
<!--        顶部header区域-->
        <mt-header fixed title="Vue-App项目">
            <span slot="left" v-show="showFlag">
                <mt-button icon="back" @click="goback()">返回</mt-button>
            </span>
        </mt-header>
<!--        中间路由router-view区域，用来显示不同组件页面的内容，设置组件切换的动画效果,加transition并添加动画样式,使用mode="out-in"会有页面空白期效果不好-->
        <transition>
            <router-view></router-view>
        </transition>
<!--        底部Tabbar区域-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcart">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.getCartCount}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                showFlag:false
            }
        },
        created(){//在created生命周期函数中对路由地址进行判断否则刷新页面或第一次加载页面时返回按钮都会隐藏
            this.showFlag=this.$route.path=='/home'?false:true;
        },
        watch:{
            '$route.path':function (newVal) {
                if(newVal=='/home'){
                    this.showFlag=false
                }else{
                    this.showFlag=true
                }
            }
        },
        methods:{
            goback(){//点击后退到上一个页面，当返回到首页时将返回按钮隐藏，使用watch监听路由地址
                this.$router.go(-1);//this.$router.go(val) => 在history记录中前进或者后退val步，当val为0时刷新当前页面,1为前进一个页面，-1为后退一个页面。
            }
        }
    }
</script>

<style scoped>
    /*解决组件滑动时浏览器的报错Unable to preventDefault inside passive event listener due to target being treated as passive，
    由于浏览器必须要在执行事件处理函数之后，才能知道有没有调用 preventDefault() ，这就导致了浏览器不能及时响应滚动，略有延迟，
    解决方法：1. 注册处理函数时，用如下方式，明确声明为不是被动的 window.addEventListener('touchmove', func, { passive: false })
    2. 为容器设置css属性touch-action，去除滑动时默认现象产生，但不影响事件触发 touch-action: none;*/
* { touch-action: none; }
/* 实现组件切换时左出右进的效果，组件应从设备等宽度的位置开始进入，因此设置transform: translateX(100%)，离开的组件应在相反-100%位置，
 组件切换时底部会出现滚动条这是因为组件切换动画的body宽度超出设置屏幕宽度因此设置overflow-x: hidden，
 还有添加position: absolute;去除组件切换时的留白问题，组件切换时有先后顺序每个组件都有其高度，动画过渡时两个组件的页面在同一个body中因此后进的组件会位于离开组件的下面带上一个组件全部离开后才会自动位于文档顶部*/
.app-container{
    padding-top: 40px;
    padding-bottom: 50px;/*因为header和tabbar都是fixed定位，会遮盖住内容，因此设置padding值*/
    overflow-x: hidden;
}
.mint-header{
    z-index:3;
}
.v-enter{
    opacity: 0;
    transform: translateX(100%);
}
.v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
}
.v-enter-active,.v-leave-active{
    transition: all 0.5s ease;
}
</style>