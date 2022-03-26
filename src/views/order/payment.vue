<template>
    <van-nav-bar class="nav-bar" title="支付结果" :border="false" fixed placeholder @click-left="$router.go(-1)" />
    <div class="top">
        <van-icon class="success-icon"  name="completed" />
        <p class="success-text">支付成功</p>
        <div class="line"></div>
    </div>
    <van-cell-group inset class="order-info">
        <p class="order-price price">9999</p>
        <van-cell title="订单编号" value="134646468" />
        <van-cell title="下单时间" value="2022-03-23 12:13:14" />
        <van-cell title="支付方式" value="微信支付" />
    </van-cell-group>
    <section class="bottom">
        <van-button block round>查看订单</van-button>
        <van-button type="primary" round block style="margin-top: 20px;" @click="$router.push('/home')">返回首页</van-button>
    </section>
</template>

<script lang="ts">
import { useRouter } from "vue-router"

export default {
    setup() {


        return {}
    }
}
</script>

<style lang="less" scoped>
.nav-bar{
    :deep(.van-nav-bar){
        background-color: var(--van-success-color);
        .van-nav-bar__title{
            color: #fff;
        }
    }
}
.top {
    text-align: center;
    padding: 30px 0;
    background-color: var(--van-success-color);
    .success-icon {
        font-size: 56px;
        color: #fff;
        margin-bottom: 20px;
    }
    .success-text {
        font-size: 16px;
        color: #fff;
    }
    .line{
        width: 90%;
        height: 14px;
        background-color: rgba(0, 0, 0, .3);
        margin: 20px auto 0;
        border-radius: 100px;
    }
}

.order-info {
    padding: 10px 0;
    margin: -38px 30px 0;
    border-radius: 0;
    box-shadow: inset 0 12px 12px -12px #333;
    .order-price {
        text-align: center;
        font-size: 30px;
        padding: 16px 0;
    }
    :deep(.van-cell__title) {
        color: var(--van-cell-value-color);
    }
}

.bottom{
    margin: 50px 30px;
}
</style>