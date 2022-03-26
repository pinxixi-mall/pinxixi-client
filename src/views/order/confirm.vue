<template>
    <van-nav-bar title="确认订单" left-arrow fixed placeholder @click-left="$router.go(-1)"></van-nav-bar>
    <!-- 地址 -->
    <section class="order-address">
        <van-cell title="单元格" is-link icon="location-o">
            <template #title>
                <p>广东省深圳市南山区粤海街道 深圳湾1号</p>
            </template>
            <template #label>
                <p>夜流云 19999999999</p>
            </template>
        </van-cell>
    </section>
    <!-- 订单内容 -->
    <Card class="order-content card">
        <goods-card
            class="order-goods"
            v-for="goods in goodsList"
            :key="goods.goodsId"
            :goods="goods"
        >
            <template #stepper>
                <p class="count">x{{ goods.goodsCount }}</p>
            </template>
        </goods-card>
    </Card>
    <!-- 订单总计 -->
    <van-cell-group inset class="order-cost">
        <van-cell title="商品金额" value="￥1999.00" />
        <van-cell title="运费" value="￥0.00" />
        <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
        <div class="total">
            <span class="label">合计：</span>
            <span class="value price">13666</span>
        </div>
    </van-cell-group>
    <!-- 备注 -->
    <van-cell-group inset class="payment-type card">
        <van-cell title="备注" value="选填" />
    </van-cell-group>
    <!-- 提交 -->
    <van-submit-bar
        :price="3050"
        label=" "
        button-text="提交订单"
        text-align="left"
        @submit="onConfirm"
    />
    <!-- submitbar占位 -->
    <div style="height: 50px;"></div>

    <!-- 优惠券列表 -->
    <van-popup
        v-model:show="showList"
        round
        position="bottom"
        style="height: 60%; padding-top: 4px;"
    >
        <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange"
            @exchange="onExchange"
        />
    </van-popup>
</template>

<script lang="ts">
import { CartItemType } from "@/types";
import { defineComponent, reactive, ref, toRefs } from "vue"
import GoodsCard from '@/components/GoodsCard/index.vue'
import Card from '@/components/Card/index.vue'
import { useRouter } from "vue-router"

export default defineComponent({
    components: { GoodsCard, Card },
    setup() {
        const state = reactive<{
            goodsList: CartItemType[]
        }>({
            goodsList: [
                { cartId: 2, goodsId: 1, goodsName: 'sfsdf', goodsCount: 1, goodsImage: 'https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg', goodsDesc: 'sdfdsf', goodsPrice: 16 },
                { cartId: 2, goodsId: 1, goodsName: 'sfsdf', goodsCount: 1, goodsImage: 'https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg', goodsDesc: 'sdfdsf', goodsPrice: 16 }
            ]
        })
        const router = useRouter()

        // 确认提交
        const onConfirm = () => {
            router.push({
                path: '/order/detail'
            })
        }

        // 支付方式
        const paymentWay = ref<string>()

        /**
         * 优惠券
         */
        const coupon = {
            available: 1,
            reason: '',
            value: 300, // 元 * 100
            name: '运费券',
            startAt: Date.now() / 1000,
            endAt: Date.now() / 1000 + 7 * 24 * 60 * 60,
            valueDesc: '3',
            unitDesc: '元',
        }
        const coupons = ref<any[]>([coupon])
        const disabledCoupons = ref<any[]>([coupon])
        const showList = ref(false)
        const chosenCoupon = ref(-1)
        const onChange = (index: number) => {
            showList.value = false;
            chosenCoupon.value = index;
        }
        const onExchange = (code: number) => {
            coupons.value.push(coupon);
        }

        return {
            ...toRefs(state),
            coupons,
            showList,
            chosenCoupon,
            disabledCoupons,
            paymentWay,
            onChange,
            onExchange,
            onConfirm
        }
    },
})
</script>

<style lang="less" scoped>
.order-address {
    position: relative;
    :deep(.van-cell){
        background-color: #fff;
    }
    &::before {
        position: absolute;
        right: 8px;
        bottom: -2px;
        left: 8px;
        height: 2px;
        background: repeating-linear-gradient(
            -45deg,
            var(--van-warning-color) 0,
            var(--van-warning-color) 20%,
            transparent 0,
            transparent 25%,
            var(--van-blue) 0,
            var(--van-blue) 45%,
            transparent 0,
            transparent 50%
        );
        background-size: 80px;
        content: "";
    }
}

.card {
    margin: 16px;
}

.order-content {
    box-sizing: border-box;
    border-radius: var(--van-border-radius-lg);
    .order-goods {
        :deep(.van-card) {
            padding: 10px 0;
        }
        .count {
            line-height: 30px;
        }
    }
    .order-goods + .order-goods {
        border-top: 1px solid var(--van-border-color);
    }
}

.order-cost {
    .total {
        text-align: right;
        padding: 16px;
        .label {
            font-size: 14px;
        }
    }
}

</style>