//这是项目的JS入口文件
//1.导入jQuery,import *** from ***是ES6中导入模块的方式
//从node_modules导入jQuery包用$来接受，由于浏览器无法识别es6的新语法，使用命名webpack .\web\webpackLearn.js -o .\dist\bundle.js将当前JS文件解析到bundle.js文件中
//import $ from '../node_modules/jquery/dist/jquery';//这句话是es6语法，webpack解析不了，可以安装babel来对es6语法进行处理
let $=require('../node_modules/jquery/dist/jquery.js');
import './css/index.css'//引入css文件使用加载器来加载处理
//import 'bootstrap/dist/css/bootstrap.css'
import 'open-iconic/font/css/open-iconic-bootstrap.css'
import Vue from '../node_modules/vue/dist/vue.js'//该方法导入的包为严格版的而不是vue.js,需要改一下包的路径，或在webpack配置文件中进行配置路径，添加resolve:{alias:{"vue$":"vue/dist/vue.js"}}
import VueRouter from 'vue-router'
Vue.use(VueRouter)//通过 Vue.use() 明确地安装路由功能
//导入Mint-UI组件，基于vue 移动端的ui框架
import MintUI from 'mint-ui'//导入所有的组件，也可以借助cnpm i babel-plugin-component -D插件来按需引入组件，占用内存会更小
import 'mint-ui/lib/style.css'//导入mint-UI的CSS样式
Vue.use(MintUI)//将MintUI安装到Vue中
//按需导入Mint-UI组件,有报错情况没有解决
/*import {Button,Cell} from 'mint-ui'
Vue.component(Button.name,Button)//注册button组件,使用use也可以
Vue.component(Cell.name, Cell)*/

import login from './login.vue'//导入login组件，.vue文件中的代码webpack无法打包，需要安装cnpm i vue-loader vue-template-compiler -D,并在配置文件中对loader进行配置
import account from './Account.vue'
import goodslist from './GoodsList.vue'
import child from './child.vue'
//创建路由对象
var router=new VueRouter({
    routes:[
        {path:'/account',component:account,
        children:[
            {path:'child',component:child}
        ]},
        {path:'/goodslist',component:goodslist}
    ]
})
var vm=new Vue({
    el:'#app',
    data:{
        msg:'Vue中的数据123'
    },
    components:{
        login
    },
    methods:{

    },
    router,
    /*render:function (createElements) {//createElements是一个方法能将制定的组件模板渲染为HTML结构，返回结果会替换el元素
        return createElements(login)//简写形式render:createEl=> createEl(login)

    }*/
})
//class关键字是es6中提供的新语法，用来面向对象进行编程，使用class来构造函数
class Person{
    static info={name:'rs',age:22}//使用static关键字来定义静态属性，可以通过类名来访问如person.info;实例属性：var p1=new Person(),p1.name就是一个实例属性
    /*当前语法属于es6高级语法，webpack无法处理，需要安装Babel将高级语法转换为低级的语法将结果交给webpack来打包处理
    安装两个包 1.cnpm i @babel/core babel-loader @babel/plugin-transform-runtime -D
    2.cnpm i @babel/preset-env @babel/preset-react babel-preset-mobx -D
    3.在webpack配置文件中对babel进行配置，{test:/\.js$/,use:'babel-loader',exclude:/node_modules/}
    匹配js结尾的文件使用babel加载器处理，必须排除掉node_modules文件避免消耗CPU提高打包速度
    4.项目根目录中新建.babelrc文件用于配置属于json格式，所有不能写注释字符串必须用双引号
    {
    "presets":["env","stage-0"],//预设的语法
    "plugins":["transform-runtime"]//插件的配置
    }
    npm un @babel/preset-stage-0
    cnpm i @babel/plugin-transform-modules-commonjs -D
    */

}
console.log(Person.info)
$(function () {
    $('li:odd').css('backgroundColor','lightblue')
    $('li:even').css('backgroundColor',function () {
        return 'lightgreen'
    })
    console.log("修改成功")
    //alert([1,2,3].map(n=>n+1));
});
/*
1.由于每次修改JS代码都要使用webpack命令来打包，使用webpack-dev-server来实现自动打包编译功能，并且会自动更新修改过后的代码和自动刷新浏览器
2.运行npm i webpack-dev-server@2.9.7 -D来安装这个工具，其用法与webpack用法一样，webpack-dev-server与webpack有版本兼容问题
npm install webpack@3.8.1 -D
3.npm webpack-dev-server@2.9.7 -D是本地即局部安装无法在终端中直接运行该命令，只有全局安装的工具才可以，
4.可以在package.json文件的script中设置"dev": "webpack-dev-server"，运行命令 npm run dev后webpack-dev-server将项目运行在http://localhost:8080/地址上,
想要自动打包编译后打开浏览器可以设置参数"dev": "webpack-dev-server --open"，还可以设置 --contentBase web来指定托管的根目录会打开到web目录下的页面，如果有index.html会自动打开这个页面
--hot参数
并且打包后的bundle.js文件是在根目录上的，与之前webpack.config.js里配置的./dist/bundle.js不是同一个文件，因此如果要引用bundle.js文件其路径应该是根目录
5.dev-server工具将打包生成的bundle文件托管到了电脑内存中并没有存放在实际的物理磁盘当中，打包速度更快
6.终端中键盘ctrl+c会停止服务器
7.将页面使用html-webpack-plugin工具也放入内存,为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
8.html-webpack-plugin会自动加载bundle.js文件位于body底部，不用再手动引入指定目录下的bundle.js文件
*/
