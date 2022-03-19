<template>
    <div class="waterfall-col">
        <div class="waterfall-card">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'WaterfallFlowSlot',
}
</script>

<style lang="less" scoped>

.waterfall-col {
    width: 33.3%;
    box-sizing: border-box;
}

.waterfall-card {
    position: relative;
    word-wrap: break-word;
    background-color: #fff;
    box-sizing: border-box;
}
</style>