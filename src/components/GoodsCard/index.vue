<template>
    <div class="goods-card">
        <van-card
            :price="goods.goodsPrice.toFixed(PRICE_DECIMAL)"
            :thumb="goods.goodsImage"
            :num="goods.goodsCount"
        >
            <template #title>
                <p class="van-multi-ellipsis--l2 name">{{ goods.goodsName }}</p>
            </template>
            <template #desc>
                <p class="van-multi-ellipsis--l2 desc">{{ goods.goodsDesc }}</p>
            </template>
            <template #num>
                <slot name="stepper"></slot>
            </template>
        </van-card>
    </div>
</template>

<script setup lang="ts">
import { CartItemType, OrderGoods } from '@/types'
import { PRICE_DECIMAL } from '@/config/constants'

const props = defineProps<{
    goods: CartItemType | OrderGoods,
}>()

const { goods } = props

</script>

<style lang="less" scoped>
.goods-card {
    :deep(.van-card) {
        background-color: #fff;
        .name {
            line-height: 16px;
        }

        .desc {
            line-height: 16px;
            font-size: 12px;
            color: var(--van-gray-6);
            margin-top: 2px;
        }
        .van-card__bottom {
            margin-top: 16px;
            .van-card__price {
                color: var(--van-primary-color);
                line-height: 30px;
            }
            .van-card__num {
                line-height: 1;
                .stepper {
                    border: 1px solid var(--van-gray-3);
                    border-radius: 40px;
                    overflow: hidden;
                    .van-stepper__minus,
                    .van-stepper__plus {
                        width: 26px;
                        height: 26px;
                        &::before {
                            width: 40%;
                        }
                        &::after {
                            height: 40%;
                        }
                    }
                    .van-stepper__input {
                        height: 26px;
                        margin: 0;
                        border-left: 1px solid var(--van-gray-3);
                        border-right: 1px solid var(--van-gray-3);
                    }
                }
            }
            .count {
                line-height: 30px;
            }
        }
    }
}
</style>