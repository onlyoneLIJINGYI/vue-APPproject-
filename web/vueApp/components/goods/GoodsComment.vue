<template>
    <div class="goodscomment-container">
        <comment :id="id"></comment>
    </div>
</template>

<script>
    import comment from '../subComponents/Comment.vue'
    export default {
        data(){
            return{
                id:this.$route.params.id
            }
        },
        components:{
            comment
        }

    }
</script>

<style scoped>
.goodscomment-container{
    padding: 10px;
}
</style>