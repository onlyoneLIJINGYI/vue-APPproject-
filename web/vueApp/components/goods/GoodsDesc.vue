<template>
    <div class="goodsdesc-container">
        <h1>{{goodsDesc.title}}</h1>
        <hr>
        <div class="content" v-html="goodsDesc.content"></div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                id:this.$route.params.id,
                goodsDesc:{}
            }
        },
        created() {
            this.getGoodsDesc()
        },
        methods:{
            getGoodsDesc(){
                this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
                    if(result.body.status===0){
                        this.goodsDesc=result.body.message[0]
                    }else {
                        console.log("请求失败")
                    }
                })
            }
        }
    }
</script>

<style scoped>
.goodsdesc-container{
padding:10px;
}
.goodsdesc-container h1{
    font-size: 16px;
    text-align: center;
    line-height: 20px;
    color: #cf0404;
}
.goodsdesc-container p{
    font-size: 14px;
    line-height: 18px;
}
.goodsdesc-container .content /deep/ img{
    width: 100%;
}
</style>