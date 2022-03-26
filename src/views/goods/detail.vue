<template>
  <!-- 顶部导航 -->
  <van-nav-bar title="商品详情" left-arrow fixed placeholder @click-left="onClickBack">
    <template #right>
      <van-icon name="cart-o" :show-zero="false" :badge="cartStore.cartCount" size="20" @click="onNavToCart" />
    </template>
  </van-nav-bar>
  <!-- 商品信息 -->
  <div class="detail">
    <section class="goods-image">
      <img :src="detail.goodsImage" :alt="detail.goodsName" />
    </section>
    <pxx-card class="info-card">
      <div class="goods-info-price">
        <div class="price num">{{ detail.goodsPrice }}</div>
        <div class="share">
          <van-icon name="share-o" size="20" />
          <div class="text">分享</div>
        </div>
      </div>
      <div class="goods-info-name">
        <p class="name">{{ detail.goodsName }}</p>
        <p class="desc van-multi-ellipsis--l2">{{ detail.goodsDesc }}</p>
      </div>
    </pxx-card>
    <pxx-card class="info-card select-card">
      <van-cell :border="false" title="选择" value="数量/规格" is-link />
      <van-cell :border="false" title="发货" is-link>
        <template #value>
          <div class="ship-info">
            <span>
              <span>深圳</span>
              <span class="split-line"></span>
              <span>快递：包邮</span>
            </span>
            <span>月销1000+</span>
          </div>
        </template>
      </van-cell>
      <van-cell :border="false" title="保障" value="7天无理由 运费险 急速退款" is-link />
      <van-cell :border="false" title="参数" value="生产日期 生成许可证" is-link />
    </pxx-card>
    <!-- 详情 -->
    <section class="goods-detail" v-html="detail.goodsDetail"></section>
  </div>
  <!-- 底部按钮 -->
  <van-action-bar>
    <van-action-bar-icon icon="shop-o" text="店铺" />
    <van-action-bar-icon icon="chat-o" text="客服" dot />
    <van-action-bar-icon icon="like-o" text="收藏" color="#ff5000" />
    <van-action-bar-button type="warning" text="加入购物车" @click="onAddCartClick" />
    <van-action-bar-button type="danger" text="立即购买" @click="onBuytClick" />
  </van-action-bar>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getGoodsDetail } from '@/api'
import { GoodsType, PathIdType, CartItemAddType } from '@/types'
import PxxCard from '@/components/Card/index.vue'
import { addCart } from '@/api'
import { Toast } from 'vant'
import { useCartStore } from '@/stores'

onMounted(() => {
  const route = useRoute()
  state.goodsId = route.params.id
  getDetail()
})

// 获取详情
const getDetail = async () => {
  const { data } = await getGoodsDetail(state.goodsId)
  state.detail = data
}

const router = useRouter()
const onClickBack = () => {
  router.go(-1)
}
const onNavToCart = () => {
  router.push({path: '/cart', query: { hide: 1 }})
}

const state = reactive<{
  goodsId: PathIdType
  detail: GoodsType | object
}>({
  goodsId: '',
  detail: {}
})

const cartStore = useCartStore()
// 加入购物车
const onAddCartClick = async () => {
  const params: CartItemAddType = {
    goodsId: Number(state.goodsId),
    goodsCount: 1
  }
  await addCart(params)
  cartStore.updateCartCount()
  Toast.success("商品已添加到购物车")
}

const { detail } = toRefs(state)
</script>

<style lang="less" scoped>
@import '@/styles/index.less';

.detail {
  height: 100vh;
  overflow-y: auto;
  background-color: var(--pxx-page-background);
  padding: 0 0 50px;
  box-sizing: border-box;
  .goods-image {
    > img {
      height: 375px;
    }
  }

  .info-card {
    margin: 12px;
    .goods-info-price {
      display: flex;
      font-size: 16px;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .num {
        color: var(--van-primary-color);
        font-size: 28px;
      }
      .share {
        height: 34px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        color: var(--van-gray-7);
        .text {
          font-size: 10px;
        }
      }
    }

    .goods-info-name {
      .name {
        font-size: 16px;
        line-height: 24px;
        font-weight: bold;
        color: var(--van-gray-8);
      }
      .desc {
        font-size: 14px;
        color: var(--van-gray-7);
        line-height: 22px;
        margin-top: 10px;
      }
    }
  }

  .select-card {
    padding: 10px 6px;
    :deep(.van-cell__title) {
      width: 50px;
      flex: unset;
      color: var(--van-gray-6);
    }
    :deep(.van-cell__value) {
      flex: 1;
      text-align: left;
      color: var(--van-gray-8);
    }
    .ship-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .split-line {
        display: inline-block;
        width: 1px;
        height: 10px;
        background-color: var(--van-gray-5);
        margin: 0 10px;
      }
    }
  }
}
</style>
