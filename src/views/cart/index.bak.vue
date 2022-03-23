<template>
  <!-- 顶部菜单 -->
  <van-nav-bar title="购物车" fixed>
    <template #right v-show="cartList.length">
      <span @click="onClickRight">{{ rightBtnText }}</span>
    </template>
  </van-nav-bar>
  <!-- 购物车列表 -->
  <van-checkbox-group class="goods-wrapper" v-model="checked" ref="checkboxGroup">
    <van-checkbox
      class="goods-item"
      v-for="(item, index) in cartList"
      :key="item.cartId"
      :name="item"
      :label-disabled="true"
    >
      <section class="goods-card">
        <van-image class="goods-image" :src="item.goodsImage" width="100" />
        <div class="goods-info">
          <div class="info">
            <p class="name van-multi-ellipsis--l1">{{ item.goodsName }}</p>
            <p class="desc van-multi-ellipsis--l2">{{ item.goodsDesc }}</p>
          </div>
          <div class="price-stepper">
            <p class="price price-value">{{ item.goodsPrice.toFixed(PRICE_DECIMAL) }}</p>
            <van-stepper
              class="stepper"
              v-model="item.goodsCount"
              step="1"
              :min="PURCHASE_QUANTITY_MIN"
              :max="PURCHASE_QUANTITY_MAX"
              @overlimit="onCountChange"
            />
          </div>
        </div>
      </section>
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
      <van-button class="submit-bar-delete" plain type="danger" round size="mini">
        {{
          '删除(' + checked.length + ')'
        }}
      </van-button>
    </template>
  </submit-bar>
</template>

<script lang="ts">
import { CheckboxGroupInstance, Toast } from 'vant'
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { PURCHASE_QUANTITY_MIN, PURCHASE_QUANTITY_MAX, PRICE_DECIMAL } from '@/config/constants'
import SubmitBar from '@/components/SubmitBar'
import Card from '@/components/Card/index.vue'
import { getCartList } from '@/api'
import { CartItemType } from '@/types'

interface StateType {
  cartList: CartItemType[];
  checked: any[];
  checkedAll: boolean;
  showTotal: boolean;
  totalPrice: number
}

export default {
  components: { SubmitBar, Card },
  setup() {
    const checkboxGroup = ref<CheckboxGroupInstance>()
    const state = reactive<StateType>({
      cartList: [],
      checked: [],
      checkedAll: false,
      showTotal: true,
      totalPrice: 0
    })

    onMounted(() => {
      getList()
    })

    const getList = async () => {
      const { data: { list } } = await getCartList()
      state.cartList = list
    }

    // 单条选中
    watch(
      () => state.checked,
      () => {
        state.checkedAll = state.checked.length === state.cartList.length
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

    // 计算总金额(vant单位是分)
    const calcTotalPrice = () => {
      state.totalPrice = state.checked.reduce((ret: any, it: any) => ret + it.goodsPrice * it.goodsCount, 0) * 100
    }

    // 编辑
    const rightBtnText = computed(() => {
      return state.showTotal ? '编辑' : '完成'
    })
    const onClickRight = () => {
      state.showTotal = !state.showTotal
    }

    // 删除
    const onDelete = () => { }

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
  height: 100vh;
  padding: 46px 16px 100px;
  box-sizing: border-box;
  background-color: var(--pxx-page-background);
  .goods-item {
    margin: 16px 0;
    padding: 20px 14px;
    border-radius: 8px;
    box-shadow: 0 0 12px #ebedf0;
    background: #fff;

    .goods-card {
      display: flex;
      padding-left: 4px;
      .goods-image{
        border-radius: 6px;
        overflow: hidden;
      }
      .goods-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 10px;
        .info {
          .name{
            font-size: 13px;
            font-weight: 500;
            color: var(--van-gray-8);
          }
          .desc{
            color: var(--van-gray-7);
            line-height: 14px;
            margin-top: 2px;
          }
        }
        .price-stepper {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .price-value {
            font-weight: 500;
          }
          :deep(.van-stepper) {
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
}

.submit-bar {
  bottom: 50px;
  &-delete {
    padding: 0 12px;
  }
}
</style>
