<template>
    <div>
        <p>使用.vue文件定义的登录组件{{msg}}</p>
        <mt-button type="primary" @click="show">mint-UI 按钮</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'//导入JS组件Toast用于消息弹框提示
    import 'open-iconic/font/css/open-iconic-bootstrap.css'
export default {//es6中使用export default和export来向外暴露对象,可以用import .. from 来接收，且在一个模块中export default只允许向外暴露一次，而export可以向外暴露多次用{}来接收
    data(){//组件中的数据必须是一个方法
        return {
           msg:'login',
           toastMsg:null
        }
    },
    created(){
        this.load()
    },
    methods:{
        load(){//模拟加载
            this.show()
          setTimeout(()=> {
              //当三秒过后加载成功将消息弹框toast移除关闭
              this.toastMsg.close()
          },3000)
        },
        show(){
            this.toastMsg=Toast({//Toast 方法会返回一个 Toast 实例，每个实例都有 close 方法，用于手动关闭 Toast
                message:'正在加载',
                position:'top',
                duration:-1,//-1表示一直显示不关闭
                iconClass:'oi oi-reload',
                className:''
            })
        }
    }
}
</script>

<style scoped>

</style>