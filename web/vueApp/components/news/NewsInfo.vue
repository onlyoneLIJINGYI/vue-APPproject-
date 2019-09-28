<template>
    <div class="newsinfo-container">
        <div class="title">{{newsinfo.title}}</div>
        <div class="subtitle">
            <span>{{newsinfo.add_time|dateFormat}}</span>
            <span>点击：{{newsinfo.click}}次</span>
        </div>
        <hr>
<!--        因为newsinfo.content是带有HTML标签元素的句子需要使用v-html来进行解析-->
        <div v-html="newsinfo.content"></div>
        <div><img src="../../../images/壁纸.jpg"></div>
        <hr>
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    import comment from '../subComponents/Comment.vue'
    export default {
        data(){
            return{
                id:this.$route.params.id,//将路由传递的参数id赋值给数据id，方便使用
                newsinfo:{}//存放新闻资讯信息的对象
            }
        },
        components:{
            'comment-box':comment
        },
        created() {
            this.getNewsInfo()
        },
        methods:{
            getNewsInfo(){
                this.$http.get('api/getnew/'+this.id).then(result=>{
                    if(result.body.status===0){
                        this.newsinfo=result.body.message[0]
                    }else{
                        console.log("请求错误")
                    }
                })
            }
        }
    }
</script>

<style scoped>
.newsinfo-container{
padding:8px;
}
.newsinfo-container .title{
    padding: 10px 0;
    font-size: 16px;
    color: darkred;
}
.newsinfo-container .subtitle{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color:darkblue;
}
.newsinfo-container img{
    width:100%;
}
</style>