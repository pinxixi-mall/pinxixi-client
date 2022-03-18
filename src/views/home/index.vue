<template>
    <div class="scroll-box" ref="scrollBox">
        <div ref="scrollContent">
            <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh">
                <van-sticky>
                    <van-search
                        v-model="searchValue"
                        shape="round"
                        background="#e43130"
                        show-action
                        placeholder="请输入搜索关键词"
                        @search="onSearch"
                    >
                        <template #action>
                            <div @click="onSearch" style="color: #fff">搜索</div>
                        </template>
                    </van-search>
                </van-sticky>
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#fa2c19" lazy-render>
                    <van-swipe-item v-for="carousel in carouselList" :key="carousel.carouselId">
                        <img class="carousel-img" :src="carousel.carouselImage" />
                    </van-swipe-item>
                </van-swipe>
                <div class="quick-nav-box">
                    <van-grid :icon-size="60" :border="false">
                        <van-grid-item
                            v-for="item in quickNavList"
                            :key="item.id"
                            :icon="item.icon"
                            :text="item.name"
                        />
                    </van-grid>
                </div>
                <!-- <van-skeleton title :row="3" :loading="isRecommendLoading"> -->
                <div class="recomend-box">
                    <div
                        class="recomend-item"
                        v-for="item in recommendList"
                        :key="item.recommendId"
                        @click="handleCommodityClick(item)"
                    >
                        <van-image class="recomend-item-img" :src="item.carouselImage" />
                        <p class="recomend-item-text van-multi-ellipsis--l2">{{ item.description }}</p>
                        <p class="recomend-item-price">
                            <span class="money-sign">￥</span>
                            <span>{{ item.price }}</span>
                        </p>
                    </div>
                    <BottomLoading :isLoading="isRecommendLoading" :isLastPage="isLastPage" />
                </div>
                <!-- </van-skeleton> -->
            </van-pull-refresh>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, toRefs, computed } from 'vue'
import { getHomeCarousel, getRecommendList } from '@/api'
import { quickNavList } from '@/mock/base'
import { RecommendProps, StateProps } from '@/types'
import { useScrollToBottom } from '@/use'
import BottomLoading from '@/components/BottomLoading/BottomLoading.vue'
import { useRouter } from 'vue-router'

export default {
    components: { BottomLoading },
    setup() {
        const router = useRouter()
        const state: StateProps = reactive({
            carouselList: [],
            recommendList: [],
            recommendPage: {
                pageNum: 1,
                pageSize: 5,
                total: 0
            }
        })

        const isLastPage = computed(() => {
            const { recommendList, recommendPage: { total } } = state
            return recommendList.length >= total
        })

        onMounted(() => {
            initPage()
        })

        // 初始化
        const isRefreshLoading = ref<boolean>(false)
        const initPage = async () => {
            await getCarousel()
            await getRecommend()
            isRefreshLoading.value = false
        }

        // 下拉刷新
        const onRefresh = () => {
            isRefreshLoading.value = true
            initPage()
        }

        // 触底
        const scrollBox = ref()
        const scrollContent = ref()
        useScrollToBottom(scrollBox, scrollContent, () => {
            if (!isLastPage.value) {
                state.recommendPage.pageNum++
                getRecommend()
            }
        })

        // 请求轮播列表
        const getCarousel = async () => {
            const {
                data: { list }
            } = await getHomeCarousel()

            state.carouselList = list || []
        }

        // 请求推荐列表
        const isRecommendLoading = ref<boolean>(false)
        const getRecommend = async () => {
            isRecommendLoading.value = true
            try {
                const { pageNum, pageSize } = state.recommendPage
                const params = { pageNum, pageSize, status: 1 }
                const {
                    data: { list, pageData }
                } = await getRecommendList(params)
                const { recommendList } = state
                state.recommendList = [...recommendList, ...list]
                Object.assign(state.recommendPage, pageData)
                isRecommendLoading.value = false
            } catch (error) {
                isRecommendLoading.value = false
            }
        }

        // 跳推荐详情
        const handleCommodityClick = (item: RecommendProps) => {
            router.push({
                path: `/detail/${item.recommendId}`,
            })
        }

        // 搜索
        const searchValue = ref('')
        const onSearch = () => {
            console.log('--------log--------', searchValue.value)
        }

        return {
            ...toRefs(state),
            searchValue,
            quickNavList,
            onSearch,
            onRefresh,
            isRefreshLoading,
            isLastPage,
            isRecommendLoading,
            scrollBox,
            scrollContent,
            handleCommodityClick
        }
    }
}
</script>

<style lang="less" scoped>
.scroll-box {
    width: 100vw;
    height: 100%;
    overflow: auto;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    margin-top: 10px;
    .carousel-img {
        width: 350px;
        height: 140px;
        border-radius: 10px;
    }
}

.quick-nav-box {
    background: #fff;
    padding: 12px;
    border-radius: 40px 40px 0 0;
}

.recomend-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px 5px;
    background: #f5f5f5;
    .recomend-item {
        width: 172px;
        height: 260px;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        margin: 5px;
        .recomend-item-img {
            width: 172px;
            height: 172px;
        }
        .recomend-item-text {
            // overflow: hidden;
            // text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 2;
            // line-clamp: 2;
            // -webkit-box-orient: vertical;
            font-size: 14px;
            color: #1a1a1a;
            padding: 0 4px;
            margin-bottom: 4px;
        }
        .recomend-item-price {
            padding: 0 4px;
            font-size: 16px;
            color: #fa2c19;
            font-weight: bold;
            .money-sign {
                font-size: 12px;
            }
        }
    }
}
</style>
