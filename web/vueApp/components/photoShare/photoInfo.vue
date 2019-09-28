<template>
    <div class="photoinfo-container">
        <h1>{{imgInfo.title}}</h1>
        <p>
            <span>发表时间：{{imgInfo.add_time|dateFormat}}</span>
            <span>点击：{{imgInfo.click}}次</span>
        </p>
        <hr>
<!--        缩略图部分-->
        <div class="thumbsImg">
            <vue-preview :slides="imglist" @close="handleClose"></vue-preview>
        </div>
<!--        图片内容区域-->
        <div v-html="imgInfo.content"></div>
<!--        评论子组件-->
        <comment-box :id="imgid"></comment-box>
    </div>
</template>

<script>
    //导入评论的组件挂在在当前实例上，在当前组件中引用
    import comment from '../subComponents/Comment.vue'
    export default {
        data(){
            return{
                imgid:this.$route.params.id,//路由路径传递的参数图片ID
                imgInfo:{},
                imglist:[]
            }
        },
        created(){
            this.getImageInfo();
            this.getImageList()
        },
        components:{
            'comment-box':comment
        },
        methods: {
            getImageInfo() {
                this.$http.get('api/getimageInfo/' + this.imgid).then(result => {
                    if (result.body.status === 0) {
                        this.imgInfo = result.body.message[0]
                    } else {
                        console.log("请求失败")
                    }
                })
            },
            getImageList() {
                this.$http.get('api/getthumimages/' + this.imgid).then(result => {
                    if (result.body.status === 0) {
                        result.body.message.forEach(item => {
                            item.msrc = item.src;
                            item.w = 600;
                            item.h = 400;
                        });
                        this.imglist = result.body.message
                    } else {
                        console.log("请求失败")
                    }
                })
            },
            handleClose () {
                console.log('close event')
            }
        }
    }
</script>

<style scoped>

.photoinfo-container{
    font-size:13px;
    padding:5px
}
.photoinfo-container h1{
font-size:15px;
    color: darkred;
    text-align: center;
}
.photoinfo-container p{
    display: flex;
    justify-content: space-between;
}
/*设置缩略图的样式,因为下面的类名样式被vue-preview组件封装起来来，在scope作用下重新设置样式无法起到作用，需要使用/deep/深层作用选择器，不污染其他样式，又能修改子组件在当前的样式，
Scoped CSS规范是Web组件产生不污染其他组件，也不被其他组件污染的CSS规范。这样在打包的时候会生成一个独一无二hash值，这样父组件的样式就不会影响到子组件了
*/
.thumbsImg /deep/ .my-gallery {
    display: flex;
    flex-wrap: wrap;/*弹性盒元素在必要的时候换行*/
}

.thumbsImg /deep/ figure {
    width: 30%;
    margin: 5px;
}
.thumbsImg /deep/ img {
    width: 100%;
    box-shadow: 0 0 8px #999;
    border-radius: 5px;
}

</style>