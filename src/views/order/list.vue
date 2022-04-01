<template>
    <van-nav-bar
        title="我的订单"
        left-arrow
        fixed
        placeholder
        z-index="2"
        @click-left="$router.go(-1)"
    />
    <van-tabs
        v-model:active="queryParam.orderStatus"
        sticky
        offset-top="46"
        @change="onStatusChange"
    >
        <van-tab v-for="item in statusList" :name="item.value" :title="item.title">
            <van-pull-refresh v-model="loading" @refresh="onRefresh">
                <van-list
                    v-if="orderList.length || !finished"
                    v-model:loading="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <van-cell
                        class="order-item"
                        v-for="item in orderList"
                        :key="item.orderId"
                        @click="onOrderClick(item)"
                    >
                        <div class="header">
                            <span class="label">拼夕夕官方旗舰店</span>
                            <span
                                class="status"
                            >{{ getDictName(orderStatusList, item.orderStatus) }}</span>
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
                <van-empty
                    v-else
                    class="empty-image"
                    image="https://cdn.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
                    description="没有相关订单"
                />
            </van-pull-refresh>
        </van-tab>
    </van-tabs>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import GoodsCard from '@/components/GoodsCard/index.vue'
import { getOrderList } from '@/api'
import { OrderDetail, PageType } from '@/types'
import { getDictName } from "@/utils"
import { orderStatusList } from "@/config/dicts"
import { useRoute, useRouter } from 'vue-router'

interface State {
    finished: boolean;
    orderList: OrderDetail[];
    queryParam: PageType;
}

export default defineComponent({
    components: { GoodsCard },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const loading = ref(false)
        const statusList = ref([
            { title: '全部', value: 99 },
            { title: '待支付', value: 0 },
            { title: '待收货', value: 1 },
            { title: '已完成', value: 2 },
            { title: '已取消', value: 3 },
        ])
        const state = reactive<State>({
            finished: false,
            orderList: [],
            queryParam: {
                pageNum: 0,
                pageSize: 2,
                orderStatus: 99
            }
        })

        onMounted(() => {
            if (route.params.status) {
                state.queryParam.orderStatus = +route.params.status
            }
        })

        const onLoad = async () => {
            state.queryParam.pageNum++
            const { data: { list, total } } = await getOrderList(state.queryParam, { noLoading: true })
            loading.value = false
            state.orderList = [...state.orderList, ...list]
            if (state.orderList.length === total) {
                state.finished = true
            }
        }

        // 状态切换
        const onStatusChange = (status: number) => {
            state.queryParam.orderStatus = status
            onRefresh()
        }

        // 下拉刷新
        const onRefresh = () => {
            state.queryParam.pageNum = 0
            // 清空列表数据
            state.finished = false
            state.orderList = []

            // 重新加载数据
            loading.value = true
            onLoad()
        }

        const onOrderClick = (order: OrderDetail) => {
            router.push({
                path: '/order/detail',
                query: { orderId: order.orderId }
            })
        }

        return {
            ...toRefs(state),
            loading,
            statusList,
            orderStatusList,
            onLoad,
            onRefresh,
            getDictName,
            onStatusChange,
            onOrderClick
        }
    }
})
</script>

<style scoped lang="less">
.order-item {
    background-color: unset;
    overflow: hidden;
    .header {
        display: flex;
        justify-content: space-between;
        padding: 12px;
        .label {
            font-weight: 500;
        }
        .status {
            color: var(--van-primary-color);
        }
    }
    :deep(.van-cell__value) {
        border-radius: var(--van-border-radius-lg);
        background-color: #fff;
    }
}

.empty-image {
    :deep(.van-empty__image){
        width: 90px;
        height: 90px;
        margin: 40px auto 0;
    }
}
</style>