<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" name="/home" url="/#/home">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" name="/category" url="/#/category">分类</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" badge="5" name="/cart"  url="/#/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="manager-o" badge="20" name="/mine"  url="/#/mine">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const active = ref()
    const router = useRouter()

    onMounted(() => {
      active.value = router.currentRoute.value.fullPath
    })

    return {
      active
    }
  }
})
</script>
