<template>
    <div id="waterfall-wrapper" :style="{ height: wrapperHeight + 'px' }">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { reactive, onMounted, watch, nextTick, toRefs } from 'vue'

export default {
    name: 'Waterfall',
    props: {
        // 列数
        column: {
            type: Number,
            default: 2
        },
        // 边距
        gutter: {
            type: Number,
            default: 10
        },
        // 源数据列表
        list: {
            type: Array,
            default: () => []
        }
    },
    setup(props: any) {
        const { column, gutter } = props
        const state = reactive<{
            heightArr: any[],
            wrapperHeight: number
        }>({
            heightArr: [],
            wrapperHeight: 0
        })

        // 监听数据变化，渲染瀑布流
        watch(() => props.list, () => {
            if (props.list.length === 0) return
            nextTick(() => {
                renderWaterfall()
            })
        })

        // 渲染瀑布流
        const renderWaterfall = (): void => {
            state.heightArr = Array(column).fill(0)
            const items = document.querySelectorAll('.waterfall-item')

            items.forEach((item: any) => {
                item.style.position = 'absolute'
                const minIndex = getMinIndex()
                item.style.top = `${state.heightArr[minIndex]}px`
                item.style.left = `${minIndex * (100 / column)}%`
                // 左右边距通过padding来设置
                if (minIndex === 0) {
                    // 第一列元素只有右内边距
                    item.style.paddingRight = `${gutter / 2}px`
                } else if (minIndex === column - 1) {
                    // 中间元素右左右内边距
                    item.style.paddingLeft = `${gutter / 2}px`
                } else {
                    // 最后一列元素只有左内边距
                    item.style.padding = `0 ${gutter / 2}px`
                }
                state.heightArr[minIndex] += item.querySelector('.waterfall-card').offsetHeight + gutter
            })

            // 给父容器高度赋值，解决高度塌陷问题
            state.wrapperHeight = Math.max.apply(null, state.heightArr)
        }

        // 获取最小高度元素的index
        const getMinIndex = (): number => {
            const min = Math.min.apply(null, state.heightArr)
            return state.heightArr.indexOf(min)
        }

        return {
            ...toRefs(state)
        }
    }
}
</script>

<style lang="less" scoped>
#waterfall-wrapper {
    position: relative;
}
</style>