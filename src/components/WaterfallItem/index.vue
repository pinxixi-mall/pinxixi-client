<template>
    <div class="waterfall-item" :style="{width: 100 / column + '%'}">
        <div class="waterfall-card">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'WaterfallItem',
    props: {
        column: {
            type: Number,
            default: 2
        }
    }
}
</script>

<style lang="less" scoped>
.waterfall-item {
    box-sizing: border-box;
}

.waterfall-card {
    position: relative;
    word-wrap: break-word;
    box-sizing: border-box;
}
</style>