<template>
    <div id="waterfall-wrapper">
        <slot></slot>
    </div>
</template>
<script lang="ts">
import { reactive, onMounted, ref } from 'vue'

interface heightArrType {
    heightArr: any[]
}

export default {
    name: 'WaterfallFlow',
    props: {
        column: Number,
        gutter: Number
    },
    setup(props: any) {
        const { column, gutter } = props
        const state: heightArrType = reactive({
            heightArr: Array(column).fill(0)
        })

        const calcWaterfallFlow = (): void => {
            const dom = document.querySelectorAll('.waterfall-col')
            dom.forEach((item: any) => {
                item.style.position = 'absolute'
                const minIndex = getMinIndex()
                item.style.top =  `${state.heightArr[minIndex]}px`
                item.style.left =  `${minIndex * (100 / column)}%`
                state.heightArr[minIndex] += item.querySelector('.waterfall-card').offsetHeight + gutter
            })
        }

        const getMinIndex = (): number => {
            const min = Math.min.apply(null, state.heightArr)
            return state.heightArr.indexOf(min)
        }

        onMounted(() => {
            calcWaterfallFlow()
        })
    }
}
</script>

<style lang="less" scoped>

#waterfall-wrapper{
    position: relative;
}

</style>