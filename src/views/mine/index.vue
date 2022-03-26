<template>
    <section class="user-card">
        <div class="info">
            <van-image
                class="avatar"
                round
                width="60"
                height="60"
                src="https://cdn.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
            <div>
                <p class="name">夜流云</p>
                <p class="phone">19999999999</p>
            </div>
        </div>
        <ul class="list">
            <li v-for="item in list" :key="item.value">
                <p class="value">{{ item.value }}</p>
                <p class="label">{{ item.label }}</p>
            </li>
        </ul>
    </section>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref } from 'vue'

export default defineComponent({
    name: "demo",
    setup() {
        const list = ref([
            { label: '收藏夹', value: 16 },
            { label: '足迹', value: 61 },
            { label: '红包卡券', value: 6 },
            { label: '积分', value: 366 },
        ])


        return {
            list
        }
    },
})
</script>

<style lang="less" scoped>
.user-card {
    padding: 20px;
    background: var(--van-gradient-red);
    .info {
        display: flex;
        color: #fff;
        .avatar {
            margin-right: 16px;
        }
        .name {
            font-size: 18px;
            color: var(--van-gray-8);
            margin-bottom: 8px;
        }
        .phone{
            color: #333;
        }
    }
    .list{
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
        li{
            width: 25%;
            flex: 1;
            text-align: center;
            .value{
                color: #eee;
                margin-bottom: 10px;
            }
            .label{
                color: #333;
            }
        }
    }
}
</style>