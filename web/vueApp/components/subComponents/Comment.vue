<template>
    <div class="comment-container">
        <h1>发表评论</h1>
        <textarea placeholder="请输入您的评论..." maxlength="200" v-model="commentText"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="comment-list">
            <div class="comment-area" v-for="(item,index) in commentList" :key="index">
                <div class="comment-title">第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}}</div>
                <div class="comment-content">{{item.content}}</div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                pageIndex:1,//默认显示第一页的数据,
                commentList:[],
                commentText:''
            }
        },
        created() {
            this.getComments()
        },
        methods:{
            getComments(){
                this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result=>{
                    if(result.body.status===0){
                        //使用concat函数或者.push.apply将两个数组拼接成一个新数组，在加载下一页数据同时还能显示之前的评论内容
                        //this.commentList=this.commentList.concat(result.body.message)
                        this.commentList.push.apply(this.commentList,result.body.message)
                    }else{
                        console.log("请求失败")
                    }
                })
            },
            getMore(){
                this.pageIndex++//页码加一再请求时即请求下一页的评论数据
                this.getComments()
            },
            postComment(){
                if(this.commentText==''){
                    return alert("评论不能为空")
                }
                 //请求的post方法参数：1.请求地址URL，2.提交给服务器的数据对象,项目接口api文件里定义的{content:this.commentText}3.定义提交表单数据的格式{emulateJSON:true}这里已经全局定义过了
                 this.$http.post('api/postcomment/'+this.id,{content:this.commentText.trim()}).then(result=>{
                     if(result.body.status===0){
                         //调用该方法的话会把当前页面对应的评论数组再拼接一次会有重复数据，但是页面不重新渲染新评论的数据不会显示出来，因此清空评论列表在调用该方法就可以了
                         this.commentList=[]
                         this.getComments()
                         //手动将新评论的内容添加的评论列表显示出来不再发送请求去刷新页面
                         /*var comt={user_name:'匿名用户',add_time:Date.now(),content:this.commentText};
                         this.commentList.unshift(comt)//将评论对象放入评论列表这个数组的起始位置*/
                         this.commentText=""
                     }

                  })
            }
        },
        props:["id"]//接收父组件传过来的参数，新闻详情的id
    }
</script>

<style scoped>
.comment-container textarea{
margin:0;
    font-size:13px;
}
.comment-container h1{
padding:10px 0;
font-size: 15px;
font-weight: 600;
}
.comment-container .comment-list{
    margin:10px 0;
    font-size: 13px;
    line-height: 30px;
}
.comment-container .comment-title{
    background-color: #ccc;
    padding-left:5px;
}
.comment-container .comment-content{
    text-indent: 1em;
}
</style>