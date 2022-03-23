<template>
    <div class="scroll-box" ref="scrollBox">
        <div ref="scrollContent">
            <!-- <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh"> -->
                <van-sticky>
                    <van-search
                        v-model="searchValue"
                        shape="round"
                        background="#e43130"
                        show-action
                        placeholder="请输入搜索关键词(TODO)"
                        @search="onSearch"
                    >
                        <template #action>
                            <div @click="onSearch" style="color: #fff">搜索</div>
                        </template>
                    </van-search>
                </van-sticky>
                <!-- 轮播图 -->
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#fa2c19" lazy-render>
                    <van-swipe-item v-for="carousel in carouselList" :key="carousel.carouselId">
                        <img class="carousel-img" :src="carousel.carouselImage" />
                    </van-swipe-item>
                </van-swipe>
                <!-- 快捷菜单 -->
                <div class="quick-nav-box">
                    <van-grid icon-size="40" :border="false" square clickable column-num="5">
                        <van-grid-item
                            v-for="item in quickNavList"
                            :key="item.id"
                            :icon="item.icon"
                            :text="item.name"
                        />
                    </van-grid>
                </div>
                <!-- 推荐商品 -->
                <div class="recommend-box" >
                    <Waterfall :list="recommendList">
                        <WaterfallItem
                            v-for="item in recommendList"
                            :key="item.recommendId"
                            @click="handleGoodsClick(item)"
                        >
                            <div class="recommend-item">
                                <van-image class="recommend-item-img" :src="item.goodsImage" />
                                <p
                                    class="recommend-item-text van-multi-ellipsis--l2"
                                >{{ item.recommendDesc }}</p>
                                <p class="recommend-item-price">
                                    <span class="money-sign">￥</span>
                                    <span>{{ item.goodsPrice }}</span>
                                </p>
                            </div>
                        </WaterfallItem>
                    </Waterfall>
                    <BottomLoading :isLoading="isRecommendLoading" :isLastPage="isLastPage" />
                </div>
            <!-- </van-pull-refresh> -->
        </div>
    </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted, toRefs, computed } from 'vue'
import { getHomeCarousel, getRecommendList } from '@/api'
import { quickNavList } from '@/mock'
import { RecommendType, PageType } from '@/types'
import { useScrollToBottom } from '@/use'
import BottomLoading from '@/components/BottomLoading/BottomLoading.vue'
import { useRouter } from 'vue-router'
import Waterfall from '@/components/Waterfall/index.vue'
import WaterfallItem from '@/components/WaterfallItem/index.vue'

interface HomeStateType {
    carouselList: any[];
    recommendList: Array<RecommendType>;
    recommendPage: PageType;
}

export default {
    components: { BottomLoading, Waterfall, WaterfallItem },
    setup() {
        const router = useRouter()
        const state: HomeStateType = reactive({
            carouselList: [],
            recommendList: [],
            recommendPage: {
                pageNum: 1,
                pageSize: 2,
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
            state.recommendPage.pageNum = 1
            state.recommendList = []
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
                const params = { pageNum, pageSize }
                const { data } = await getRecommendList(params)
                const { recommendList } = state
                state.recommendList = [...recommendList, ...data.list]
                Object.assign(state.recommendPage, { pageNum: data.pageNum, pageSize: data.pageSize, total: data.total })
                isRecommendLoading.value = false
            } catch (error) {
                isRecommendLoading.value = false
            }
        }

        // 跳推荐详情
        const handleGoodsClick = (item: RecommendType) => {
            router.push({
                path: `/goods/detail/${item.goodsId}`,
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
            handleGoodsClick
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
    padding: 10px 0;
    border-radius: 40px 40px 0 0;
}

.recommend-box {
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 10px;
    background: var(--pxx-page-background);
    .recommend-item {
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid var(--van-pray-6);
        padding-bottom: 10px;
        .recommend-item-img{
            height: 172px;
        }
        .recommend-item-text {
            font-size: 14px;
            color: #1a1a1a;
            padding: 8px 8px 0;
            margin-bottom: 4px;
        }
        .recommend-item-price {
            padding: 0 4px;
            font-size: 16px;
            color: var(--van-primary-color);
            font-weight: bold;
            .money-sign {
                font-size: 12px;
            }
        }
    }
}

</style>
