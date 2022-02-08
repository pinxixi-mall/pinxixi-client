<template>
  <div class="top">
    <img
      class="goods-image"
      src="//m.360buyimg.com/mobilecms/s750x750_jfs/t1/210568/8/7961/230802/61832a7eE276e5e5e/d914cda628d101eb.jpg!q80.dpg.webp"
      alt=""
    />
  </div>
  <div class="goods-price">
    <div class="price">199</div>
    <div class="favor">
      <van-icon name="star-o" size="20"/>
      <div class="favor-text">收藏</div>
    </div>
  </div>
  <div class="goods-name">
    漫步者(EDIFIER)HECATE GM360声卡版 入耳式双动圈四核游戏耳机 电脑手机耳麦 7.1声道外置声卡 黑红色
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
// console.log('------log------', route)
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.top {
  .goods-image {
    height: 375px;
  }
}
.goods-price {
  display: flex;
  font-size: 16px;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  .price {
    font-weight: bold;
    color: @primary;
    font-size: 30px;
  }
  .favor {
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .favor-text{
        font-size: 12px;
    }
  }
}

.goods-name{
    padding: 0 20px;
    font-size: 16px;
    line-height: 21px;
    font-weight: bold;
    color: #262626;
}
</style>
