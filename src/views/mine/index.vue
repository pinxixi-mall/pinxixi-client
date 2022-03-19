<template>
    <waterfall :column="3" :gutter="10">
        <waterfall-slot>
            <div class="item">
                <p class="card-text">222-This is a short card.</p>
                <p class="card-text">222-This is a short card.</p>
                <p class="card-text">222-This is a short card.</p>
                <p class="card-text">222-This is a short card.</p>
            </div>
        </waterfall-slot>
        <waterfall-slot>
            <div class="item">
                <p class="card-text">222-This is a short card.</p>
                <p class="card-text">222-This is a short card.</p>
            </div>
        </waterfall-slot>
        <waterfall-slot>
            <div class="item">
                <p class="card-text">222-This is a short card.</p>
                <p class="card-text">222-This is a short card.</p>
                <p class="card-text">222-This is a short card.</p>
                <p class="card-text">222-This is a short card.</p>
            </div>
        </waterfall-slot>
        <waterfall-slot>
            <div class="item">
                <p class="card-text">222-This is a short card.</p>
                <p class="card-text">222-This is a short card.</p>
                <p class="card-text">222-This is a short card.</p>
            </div>
        </waterfall-slot>
    </waterfall>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue'
import Waterfall from './waterfall.vue'
import WaterfallSlot from './waterfall-slot.vue'

export default {
    name: "demo",
    setup() {
        const colRef = ref<any>([]);



        return {
        };
    },
    components: { WaterfallSlot, Waterfall }
}
</script>

<style lang="less" scoped>
.item{
    border: 1px solid #10e010;
}
</style>