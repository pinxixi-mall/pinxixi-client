<template>
  <!-- 顶部菜单 -->
  <van-nav-bar title="购物车" :right-text="rightBtnText" fixed @click-right="onClickRight" />
  <!-- 购物车列表 -->
  <van-checkbox-group class="goods-wrapper" v-model="checked" ref="checkboxGroup">
    <van-checkbox
      class="goods-item"
      v-for="(item, index) in goodsList"
      :key="index"
      :name="item"
      :label-disabled="true"
    >
      <van-card
        :price="item.price.toFixed(PRICE_DECIMAL)"
        desc="描述信息"
        :title="item.goodsName"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
      >
        <template #footer>
          <van-stepper
            class="stepper"
            v-model="item.count"
            step="1"
            :min="PURCHASE_QUANTITY_MIN"
            :max="PURCHASE_QUANTITY_MAX"
            @overlimit="onCountChange"
          />
        </template>
      </van-card>
    </van-checkbox>
  </van-checkbox-group>
  <!-- 提交 -->
  <submit-bar
    class="submit-bar"
    :price="totalPrice"
    :button-size="100"
    :show-total="showTotal"
    :button-text="'提交订单(' + checked.length + ')'"
    @submit="onSubmit"
  >
    <van-checkbox v-model="checkedAll" @click="onCheckedAll">全选</van-checkbox>
    <template #button v-if="!showTotal">
      <van-button class="submit-bar-delete" plain type="danger" round size="mini">{{
        '删除(' + checked.length + ')'
      }}</van-button>
    </template>
  </submit-bar>
</template>

<script lang="ts">
import { CheckboxGroupInstance, Toast } from 'vant'
import { computed, reactive, ref, toRefs, watch } from 'vue'
import { PURCHASE_QUANTITY_MIN, PURCHASE_QUANTITY_MAX, PRICE_DECIMAL } from '@/config/constants'
import SubmitBar from '@/components/SubmitBar'

export default {
  components: { SubmitBar },
  setup() {
    const checkboxGroup = ref<CheckboxGroupInstance>()
    const state = reactive({
      goodsList: [
        { goodsName: '描述信息2', count: 1, price: 1900.00 },
        { goodsName: '描述信息2', count: 2, price: 19.01 },
        { goodsName: '描述信息2', count: 1, price: 36.789 },
        { goodsName: '描述信息2', count: 3, price: 19 }
      ],
      checked: [],
      checkedAll: false,
      showTotal: true,
      totalPrice: 0
    })

    // 单条选中
    watch(
      () => state.checked,
      () => {
        state.checkedAll = state.checked.length === state.goodsList.length
        calcTotalPrice()
      }
    )

    // 全选<->取消全选
    const onCheckedAll = () => {
      checkboxGroup.value?.toggleAll(state.checkedAll)
    }

    // 购买数量边界提示
    const onCountChange = (value: string) => {
      const tips = <any>{
        minus: `至少购买${PURCHASE_QUANTITY_MIN}件哦`,
        plus: `最多只能购买${PURCHASE_QUANTITY_MAX}件`
      }
      Toast(tips[value])
    }

    // 计算总金额
    const calcTotalPrice = () => {
      state.totalPrice = state.checked.reduce((ret: any, it: any) => ret + it.price * it.count, 0) * 100
    }

    // 编辑
    const rightBtnText = computed(() => {
      return state.showTotal ? '编辑' : '完成'
    })
    const onClickRight = () => {
      state.showTotal = !state.showTotal
    }

    // 删除
    const onDelete = () => {}

    // 提交
    const onSubmit = () => {
      if (state.checked.length === 0) {
        Toast('您还没有选择商品哦')
        return
      }
    }

    return {
      ...toRefs(state),
      checkboxGroup,
      PURCHASE_QUANTITY_MIN,
      PURCHASE_QUANTITY_MAX,
      PRICE_DECIMAL,
      rightBtnText,
      onSubmit,
      onCheckedAll,
      onCountChange,
      onClickRight,
      onDelete
    }
  }
}
</script>

<style lang="less" scoped>
.goods-wrapper {
  padding: 40px 16px 90px;
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
        .van-card__price {
          color: var(--van-submit-bar-price-color);
        }
        .stepper {
          position: absolute;
          bottom: 6px;
          right: 0;
          border: 1px solid var(--van-gray-3);
          border-radius: 40px;
          overflow: hidden;
          .van-stepper__minus,
          .van-stepper__plus {
            width: 26px;
            height: 26px;
            &::before {
              width: 40%;
            }
            &::after {
              height: 40%;
            }
          }
          .van-stepper__input {
            height: 26px;
            margin: 0;
            border-left: 1px solid var(--van-gray-3);
            border-right: 1px solid var(--van-gray-3);
          }
        }
      }
    }
  }
}

.submit-bar {
  bottom: 50px;
  &-delete{
    padding: 0 12px;
  }
}
</style>
