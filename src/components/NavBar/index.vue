<template>
    <div>
        <van-nav-bar
            :title="title"
            :fixed="fixed"
            :left-arrow="leftArrow"
            @click-left="onClickLeft"
            @click-right="onClickRight"
        >

        </van-nav-bar>
    </div>
</template>

<script setup lang="ts">
import { NavBarProps } from 'vant';
import { useAttrs } from 'vue'
import { useRouter } from 'vue-router';

const props = defineProps<NavBarProps>()

const { title } = props

const emit = defineEmits<{
    (event: 'click-left', ev: any): void
    (event: 'click-right', ev: any): void
}>()

const router = useRouter()
const attrs = useAttrs()

console.log(attrs);


const onClickLeft = (event: any) => emit("click-left", event)
const onClickRight = (event: any) => emit("click-right", event)

</script>

<style lang="less" scoped>
</style>