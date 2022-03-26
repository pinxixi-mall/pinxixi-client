<template>
    <van-nav-bar title="订单详情" left-arrow fixed placeholder @click-left="$router.go(-1)"></van-nav-bar>
    <section class="order-status">
        <div class="left">
            <p class="status">待支付</p>
            <p class="desc">
                <span>订单将在</span>
                <van-count-down class="count-down" :time="remainTime" />
                <span>后关闭，请及时支付</span>
            </p>
        </div>
        <van-icon class="icon" name="paid" />
    </section>
    <section class="order-address card">
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
    <!-- 商品金额 -->
    <van-cell-group inset class="order-cost">
        <van-cell title="商品金额" value="￥1999.00" />
        <van-cell title="运费" value="￥0.00" />
        <van-cell title="优惠券" value="无可用" is-link />
        <div class="total">
            <span class="label">合计：</span>
            <span class="value price">13666</span>
        </div>
    </van-cell-group>
    <!-- 支付方式 -->
    <van-cell-group inset class="payment-way card">
        <van-cell title="支付方式" />
        <van-radio-group v-model="paymentWay">
            <van-cell-group class="cell" inset>
                <van-cell class="ali" title="支付宝" icon="alipay">
                    <template #right-icon>
                        <van-radio name="1" />
                    </template>
                </van-cell>
                <van-cell class="weixin" title="微信" icon="wechat">
                    <template #right-icon>
                        <van-radio name="2" />
                    </template>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </van-cell-group>
    <!-- 发票 -->
    <van-cell-group inset class="payment-type card">
        <van-cell title="发票" value="不开发票" is-link />
    </van-cell-group>
    <!-- 订单明细 -->
    <van-cell-group inset class="order-detail card" :border="false">
        <van-cell title="下单时间" value="2022-03-03 12:13:14" />
        <van-cell title="订单编号" value="1646878965464">
            <template #right-icon>
                <span style="font-size: 12px;color: var(--van-blue);margin-left: 6px;">复制</span>
            </template>
        </van-cell>
    </van-cell-group>
    <!-- 提交支付 -->
    <van-submit-bar button-text="立即支付" @submit="onSubmit" />
    <!-- 占位 -->
    <div style="height: 50px;"></div>
</template>

<script lang="ts">
import { CartItemType } from "@/types";
import { defineComponent, reactive, ref, toRefs } from "vue"
import GoodsCard from '@/components/GoodsCard/index.vue'
import Card from '@/components/Card/index.vue'

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

        const remainTime = ref(15 * 60 * 60 * 1000)
        const paymentWay = ref<string>()

        const onSubmit = () => {

        }

        return {
            ...toRefs(state),
            paymentWay,
            remainTime,
            onSubmit
        }
    },
})
</script>

<style lang="less" scoped>
.order-status {
    height: 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    background-color: var(--van-blue);
    color: #fff;
    .status {
        font-size: 20px;
        margin-bottom: 4px;
    }
    .desc {
        font-size: 12px;
        display: flex;
        align-items: center;
        .count-down{
            width: 60px;
            margin: 0 2px;
            font-weight: 500;
            color: var(--van-danger-color);
        }
    }
    .icon {
        font-size: 50px;
    }
}
.order-address {
    position: relative;
    :deep(.van-cell) {
        background-color: #fff;
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
        .value {
            color: var(--);
        }
    }
}

.payment-way {
    .cell {
        :deep(.van-cell) {
            padding: var(--van-cell-vertical-padding) 0;
        }
        .ali {
            :deep(.van-icon-alipay) {
                font-size: 26px;
                color: #326bf4;
            }
        }
        .weixin {
            :deep(.van-icon-wechat) {
                font-size: 26px;
                color: #4eaf67;
            }
        }
    }
}

.order-detail {
    :deep(.van-cell__title) {
        color: var(--van-cell-value-color);
    }
}
</style>