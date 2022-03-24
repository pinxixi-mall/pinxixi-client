<template>
  <!-- 顶部菜单 -->
  <van-nav-bar title="购物车" fixed>
    <template #right v-if="cartList.length">
      <span @click="onClickRight">{{ rightBtnText }}</span>
    </template>
  </van-nav-bar>
  <template v-if="cartList.length">
    <!-- 购物车列表 -->
    <van-checkbox-group class="goods-wrapper" v-model="checked" ref="checkboxGroup">
      <van-checkbox
        class="goods-item"
        v-for="item in cartList"
        :key="item.cartId"
        :name="item"
        :label-disabled="true"
      >
        <van-card
          :price="item.goodsPrice.toFixed(PRICE_DECIMAL)"
          :thumb="item.goodsImage"
        >
          <template #title>
            <p class="van-multi-ellipsis--l2 name">{{ item.goodsName }}</p>
          </template>
          <template #desc>
            <p class="van-multi-ellipsis--l2 desc">{{ item.goodsDesc }}</p>
          </template>
          <template #num>
            <van-stepper
              class="stepper"
              v-model="item.goodsCount"
              step="1"
              :min="PURCHASE_QUANTITY_MIN"
              :max="PURCHASE_QUANTITY_MAX"
              :before-change="(value) => onBeforeCountChange(value, item)"
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
      :button-text="'去结算(' + checked.length + ')'"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll" @click="onCheckedAll">全选</van-checkbox>
      <template #button v-if="!showTotal">
        <van-button class="submit-bar-delete" plain type="danger" round size="mini" @click="onDeleteCart">
          {{ '删除(' + checked.length + ')' }}
        </van-button>
      </template>
    </submit-bar>
  </template>
  <van-empty
    v-else
    class="empty"
    image="https://img.yzcdn.cn/vant/custom-empty-image.png"
    description="购物车为空"
  >
    <van-button class="empty-btn" type="primary" plain round>去逛逛</van-button>
  </van-empty>
</template>

<script lang="ts">
import { CheckboxGroupInstance, Toast, Dialog } from 'vant'
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { PURCHASE_QUANTITY_MIN, PURCHASE_QUANTITY_MAX, PRICE_DECIMAL } from '@/config/constants'
import SubmitBar from '@/components/SubmitBar'
import { getCartList, updateCart, deleteCart } from '@/api'
import { CartItemType } from '@/types'

interface StateType {
  cartList: CartItemType[];
  checked: any[];
  checkedAll: boolean;
  showTotal: boolean;
  totalPrice: number;
}

export default {
  components: { SubmitBar },
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
      const {
        data: { list }
      } = await getCartList()
      state.cartList = list
      // 默认选中全部
      state.checked = list
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
      state.totalPrice =
        state.checked.reduce((ret: any, it: any) => ret + it.goodsPrice * it.goodsCount, 0) * 100
    }

    // 编辑
    const rightBtnText = computed(() => {
      return state.showTotal ? '编辑' : '完成'
    })
    const onClickRight = () => {
      state.showTotal = !state.showTotal
    }

    // 修改购物车数量
    const onBeforeCountChange = (value: number, item: CartItemType): boolean | Promise<boolean> => {
      return new Promise(async (resolve) => {
        await updateCart({ cartId: item.cartId, goodsCount: value })
        resolve(true)
      })
    }

    // 删除
    const onDeleteCart = () => {
      Dialog.confirm({
        title: `确认要删除这${state.checked.length}种商品吗？`,
        beforeClose: (action) => {
          return new Promise(async (resolve) => {
            if (action === 'confirm') {
              try {
                await deleteCart({ cartIds: state.checked.map(it => it.cartId) })
                resolve(true)
              } catch (error) {
                resolve(false)
              }
            }
            resolve(true)
          })
        }
      })
    }

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
      onDeleteCart,
      onBeforeCountChange
    }
  }
}
</script>

<style lang="less" scoped>
.goods-wrapper {
  // height: 100vh;
  padding: 46px 16px 90px;
  box-sizing: border-box;
  background-color: var(--pxx-page-background);
  .goods-item {
    margin: 14px 0;
    padding: 20px 12px;
    border-radius: 8px;
    box-shadow: 0 0 12px #ebedf0;
    background: #fff;
    .name{
      line-height: 16px;
    }

    .desc {
      line-height: 16px;
      font-size: 12px;
      color: var(--van-gray-6);
      margin-top: 2px;
    }

    :deep(.van-checkbox__label) {
      flex: 1;
      .van-card {
        padding: 0 0 0 4px;
        background-color: #fff;
        .van-card__bottom {
          margin-top: 16px;
          .van-card__price {
            color: var(--van-primary-color);
            line-height: 30px;
          }
          .van-card__num {
            line-height: 1;
            .stepper {
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
}

.submit-bar {
  bottom: 50px;
  &-delete {
    padding: 0 12px;
  }
}

.empty {
  margin: 50px 0;
  :deep(.van-empty__image) {
    width: 90px;
    height: 90px;
  }
  .empty-btn {
    height: 40px;
    padding: 0 40px;
  }
}
</style>
