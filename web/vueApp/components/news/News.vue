<template>
    <div>
<!--        新闻的图文列表,使用的是mui框架的media list-->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
<!--                根据传递的id这个参数来获取对应的新闻详情数据-->
                <router-link v-bind:to="'/home/newsInfo/'+item.id">
       <!--   src属性不能直接写item.img否则会认为是一个本地的URL地址，需添加v-bind来当做表达式对item对象的数据进行判断,上面router-link中to属性也是同样的道理-->
                    <img class="mui-media-object mui-pull-left" v-bind:src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.add_time|dateFormat}}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                newsList:[]//存放新闻资讯列表信息的数组
            }
        },
        created(){
          this.getNewsList()
        },
        methods:{
            getNewsList(){
                this.$http.get('api/getnewslist').then(result=>{
                    if(result.body.status===0){
                        this.newsList=result.body.message
                    }else{
                        console.log("no")
                    }
                })
            }
        }
    }
</script>

<style scoped>
.mui-media-body h1{
    font-size:14px;
    font-weight: 400;
}
.mui-media-body .mui-ellipsis{
    font-size:12px;
    color:#226aff;
    display: flex;
    justify-content: space-between;/*使用flex布局进行两端对齐*/
}
</style>