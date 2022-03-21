<template>
  <van-checkbox-group class="goods-wrapper" v-model="checked" ref="checkboxGroup">
    <van-checkbox
      class="goods-item"
      name="c"
      v-for="(item, index) in goodsList"
      :key="index"
      :label-disabled="true"
    >
      <van-card price="2.00" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg">
        <template #footer>
          <van-stepper class="stepper" v-model="item.count" step="1" :min="0" />
        </template>
      </van-card>
    </van-checkbox>
  </van-checkbox-group>
  <van-submit-bar class="submit-bar" :price="3050" button-text="提交订单" @submit="onSubmit">
    <van-checkbox v-model="checkedAll">全选</van-checkbox>
    <template #tip>
      你的收货地址不支持配送,
      <span>修改地址</span>
    </template>
  </van-submit-bar>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue"

export default {
  setup() {
    const state = reactive({
      goodsList: [{ count: 1 }, { count: 1 }, { count: 1 }, { count: 1 }],
      checked: [],
      checkedAll: false
    })

    const onSubmit = () => {

    }

    return {
      ...toRefs(state),
      onSubmit
    }
  }
}
</script>

<style lang="less" scoped>
.goods-wrapper {
  padding: 0 16px 90px;
  background-color: #fff;
  .goods-item {
    margin: 16px 0;
    padding: 10px 14px;
    border-radius: 8px;
    box-shadow: 0 0 12px #ebedf0;
    :deep(.van-checkbox__label) {
      flex: 1;
      .van-card {
        padding-left: 8px;
        background-color: #fff;
        .stepper {
          position: absolute;
          bottom: 4px;
          right: 0;
        }
      }
    }
  }
}

.submit-bar{
  bottom: 50px;
}
</style>
