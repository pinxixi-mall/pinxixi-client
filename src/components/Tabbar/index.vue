<template>
  <van-tabbar v-model="active" class="common-nav">
    <van-tabbar-item icon="home-o" name="/home" url="/#/home">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" name="/category" url="/#/category">分类</van-tabbar-item>
    <van-tabbar-item
      icon="shopping-cart-o"
      name="/cart"
      url="/#/cart"
      :badge="carStore.cartCount"
      :badge-props="{ showZero: false }"
    >购物车</van-tabbar-item>
    <van-tabbar-item icon="manager-o" name="/mine" url="/#/mine">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores'

export default defineComponent({
  setup() {
    const active = ref()
    const router = useRouter()
    const carStore = useCartStore()

    onMounted(() => {
      active.value = router.currentRoute.value.fullPath
      carStore.updateCartCount()
    })

    return {
      active,
      carStore,
    }
  }
})
</script>
<style lang="less" scoped>
.common-nav {
  box-shadow: 0 0 10px 0 hsl(0deg 6% 58% / 60%);
}
</style>