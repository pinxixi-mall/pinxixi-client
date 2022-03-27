<template>
    <van-nav-bar title="我的订单" left-arrow fixed placeholder z-index="2" @click-left="$router.go(-1)" />
    <van-tabs v-model:active="status" sticky offset-top="46">
        <van-tab v-for="item in statusList" :title="item.title">
            <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <van-cell class="order-item" v-for="item in orderList" :key="item.orderId">
                    <div class="header">
                        <span class="label">拼夕夕官方旗舰店</span>
                        <span class="status">{{item.status}}</span>
                    </div>
                    <goods-card
                        class="order-goods"
                        v-for="goods in item.goodsList"
                        :key="goods.goodsId"
                        :goods="goods"
                    >
                        <template #stepper>
                            <p class="count">x{{ goods.goodsCount }}</p>
                        </template>
                    </goods-card>
                </van-cell>
            </van-list>
        </van-tab>
    </van-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import GoodsCard from '@/components/GoodsCard/index.vue'

export default defineComponent({
    components: { GoodsCard },
    setup() {
        const loading = ref(false)
        const statusList = ref([
            { title: '全部', value: -1 },
            { title: '待支付', value: 0 },
            { title: '待收货', value: 1 },
            { title: '已完成', value: 2 },
            { title: '已取消', value: 3 },
        ])
        const state = reactive({
            status: 1,
            finished: false,
            orderList: [
                {
                    orderId: 0,
                    status: '已支付',
                    goodsList: [
                        { cartId: 2, goodsId: 1, goodsName: 'sfsdf', goodsCount: 1, goodsImage: 'https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg', goodsDesc: 'sdfdsf', goodsPrice: 16 },
                    ]
                },
                {
                    orderId: 1,
                    status: '已支付',
                    goodsList: [
                        { cartId: 2, goodsId: 1, goodsName: 'sfsdf', goodsCount: 1, goodsImage: 'https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg', goodsDesc: 'sdfdsf', goodsPrice: 16 },
                        { cartId: 2, goodsId: 1, goodsName: 'sfsdf', goodsCount: 1, goodsImage: 'https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg', goodsDesc: 'sdfdsf', goodsPrice: 16 }
                    ]
                },
                {
                    orderId: 3,
                    status: '已支付',
                    goodsList: [
                        { cartId: 2, goodsId: 1, goodsName: 'sfsdf', goodsCount: 1, goodsImage: 'https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg', goodsDesc: 'sdfdsf', goodsPrice: 16 },
                        { cartId: 2, goodsId: 1, goodsName: 'sfsdf', goodsCount: 1, goodsImage: 'https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg', goodsDesc: 'sdfdsf', goodsPrice: 16 }
                    ]
                }
            ]
        })
        const onLoad = () => {

        }

        return {
            ...toRefs(state),
            loading,
            statusList,
            onLoad
        }
    }
})
</script>

<style scoped lang="less">
.order-item{
    background-color: unset;
    overflow: hidden;
    .header{
        display: flex;
        justify-content: space-between;
        padding: 12px;
        .label{
            font-weight: 500;
        }
        .status{
            color: var(--van-primary-color);
        }
    }
    :deep(.van-cell__value){

        border-radius: var(--van-border-radius-lg);
        background-color: #fff;
    }
    .goods-card{
    }
}
</style>