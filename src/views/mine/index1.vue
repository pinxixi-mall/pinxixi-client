<template>
    <div class="f12" id="app-mains" style="display: flex;flex-wrap: wrap;">
        <div class="col6" :ref="setRef">
            <div class="card1">
                <p
                    class="card-text"
                >111-This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        <div class="col6" :ref="setRef">
            <div class="card1">
                <p class="card-text">222-This is a short card.</p>
            </div>
        </div>
        <div class="col6" :ref="setRef">
            <div class="card1">
                <p
                    class="card-text"
                >333-This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        <div class="col6" :ref="setRef">
            <div class="card1">
                <div class="card-card1">
                    <p class="card-text">444-This is a short card.</p>
                </div>
            </div>
        </div>
        <div class="col6" :ref="setRef">
            <div class="card1">
                <p
                    class="card-text"
                >555-This is a longer card with supp This content is a little bit longer.</p>
            </div>
        </div>
        <div class="col6" :ref="setRef">
            <div class="card1">
                <p class="card-text">666-This is a short card.</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue'
interface waterfallFlow {
    waterfallFlowHeight: Array<any>
}
export default {
    name: 'demo',
    setup() {
        const colRef = ref<any>([])
        const state: waterfallFlow = reactive({
            waterfallFlowHeight: [0, 0]
        })
        const waterfallFlowFun = (): void => {
            colRef.value.forEach((item: any) => {
                item.style.position = 'absolute'
                const minIndex = filterMin()
                item.style.top = state.waterfallFlowHeight[minIndex] + 10 + 'px'
                item.style.left = minIndex * (100 / 2) + '%'
                state.waterfallFlowHeight[minIndex] += item.querySelector('.card1').offsetHeight + 10
            })
        }
        const filterMin = (): number => {
            const min = Math.min.apply(null, state.waterfallFlowHeight)
            return state.waterfallFlowHeight.indexOf(min)
        }
        onMounted(() => waterfallFlowFun())

        const setRef = (el: any) => colRef.value.push(el)

        return {
            colRef,
            setRef
        }
    }
}
</script>

<style lang="less">
#app-mains {
    position: relative;
}

.card1 {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    padding: 1.1em;
}

.col6 {
    max-width: 50%;
    padding: 0 15px;
    // padding-left: 0 !important;
    // padding-right: 0 !important;
    // margin-top: 0 !important;
}
</style>