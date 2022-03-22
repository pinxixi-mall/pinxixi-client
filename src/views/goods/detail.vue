<template>
  <van-nav-bar title="商品详情" left-arrow fixed @click-left="onClickBack" />
  <section class="detail">
    <div class="top">
      <img
        class="goods-image"
        src="//m.360buyimg.com/mobilecms/s750x750_jfs/t1/210568/8/7961/230802/61832a7eE276e5e5e/d914cda628d101eb.jpg!q80.dpg.webp"
        alt
      />
    </div>
    <div class="goods-price">
      <div class="price">199</div>
      <div class="favor">
        <van-icon name="like-o" size="20" />
        <div class="favor-text">收藏</div>
      </div>
    </div>
    <div class="goods-name">漫步者(EDIFIER)HECATE GM360声卡版 入耳式双动圈四核游戏耳机 电脑手机耳麦 7.1声道外置声卡 黑红色</div>
  </section>
  <submit-bar class="bottom-bar" :show-total="false">
    <div class="bottom-icon">
      <div class="icon-col">
        <van-icon name="shop-o" size="22" color="#ee0a24" />
        <p class="label">店铺</p>
      </div>
      <div class="icon-col">
        <van-icon name="chat-o" size="22" />
        <p class="label">客服</p>
      </div>
      <div class="icon-col">
        <van-icon name="shopping-cart-o" badge="2" size="22" />
        <p class="label">购物车</p>
      </div>
    </div>
    <template #button>
      <van-button
        class="bottom-btn"
        round
        color="linear-gradient(135deg,#ffba0d,#ffc30d 69%,#ffcf0d)"
        
      >加入购物车</van-button>
      <van-button
        class="bottom-btn"
        round
        color="linear-gradient(135deg,#f2140c,#f2270c 70%,#f24d0c)"
      >立即购买</van-button>
    </template>
  </submit-bar>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import SubmitBar from '@/components/SubmitBar'

const router = useRouter()
const onClickBack = () => {
  router.go(-1)
}
</script>

<style lang="less" scoped>
@import "@/styles/index.less";

.detail {
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
      .favor-text {
        font-size: 10px;
      }
    }
  }

  .goods-name {
    padding: 0 20px;
    font-size: 16px;
    line-height: 21px;
    font-weight: bold;
    color: #262626;
  }
}

.bottom-bar {
  /deep/.pxx-submit-bar__bar {
    padding: 0 6px;
  }
  .bottom-icon {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    .icon-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      .label {
        font-size: 10px;
        color: var(--van-gray-8);
        margin-top: 2px;
      }
    }
  }
  .bottom-btn {
    height: 38px;
    padding: 0 20px;
  }
  .bottom-btn + .bottom-btn {
    margin-left: 6px;
  }
}
</style>
