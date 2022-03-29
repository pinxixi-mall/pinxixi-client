<template>
  <!-- 顶部菜单 -->
  <van-nav-bar title="购物车" fixed placeholder :left-arrow="!tabbarStore.show" @click-left="$router.go(-1)">
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
        <goods-card :goods="item">
          <template #stepper>
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
        </goods-card>
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
    description="购物车还没有商品哦"
  >
    <template #image>
      <van-icon name="shopping-cart-o" style="color: var(--van-gray-6);font-size: 80px;"/>
    </template>
    <van-button class="empty-btn" type="primary" plain round to="/home">去逛逛</van-button>
  </van-empty>
</template>

<script lang="ts">
import { CheckboxGroupInstance, Toast, Dialog } from 'vant'
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { PURCHASE_QUANTITY_MIN, PURCHASE_QUANTITY_MAX, PRICE_DECIMAL } from '@/config/constants'
import SubmitBar from '@/components/SubmitBar'
import { getCartList, updateCart, deleteCart } from '@/api'
import { CartItemType } from '@/types'
import { useCartStore, useTabbarStore } from '@/stores'
import GoodsCard from '@/components/GoodsCard/index.vue'
import { useRouter } from 'vue-router'

interface StateType {
  cartList: CartItemType[];
  checked: any[];
  checkedAll: boolean;
  showTotal: boolean;
}

export default defineComponent({
  components: { SubmitBar, GoodsCard },
  setup() {
    const checkboxGroup = ref<CheckboxGroupInstance>()
    const state = reactive<StateType>({
      cartList: [],
      checked: [],
      checkedAll: false,
      showTotal: true,
    })
    const router = useRouter()

    const tabbarStore = useTabbarStore()
    const wrapperBottom = computed(() => tabbarStore.show ? '60px' : '10px')
    const submitBottom = computed(() => tabbarStore.show ? '50px' : 0)

    onMounted(() => {
      getList()
    })

    const getList = async () => {
      const { data } = await getCartList()
      state.cartList = data
      // 默认选中全部
      state.checked = data
    }

    // 单条选中
    watch(
      () => state.checked,
      () => {
        state.checkedAll = state.checked.length === state.cartList.length
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

    // 总金额(vant单位是分)
    const totalPrice = computed(() => {
      return state.checked.reduce((ret: any, it: any) => ret + it.goodsPrice * it.goodsCount, 0) * 100
    })

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
    const cartStore = useCartStore()
    const onDeleteCart = () => {
      Dialog.confirm({
        title: `确认要删除这${state.checked.length}种商品吗？`,
        beforeClose: (action) => {
          return new Promise(async (resolve) => {
            if (action === 'confirm') {
              try {
                await deleteCart({ cartIds: state.checked.map(it => it.cartId) })
                await getList()
                cartStore.updateCartCount(state.cartList.length)
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
      router.push({
        path: '/order/confirm',
        query: {
          ids: state.checked.map(it => it.cartId).toString()
        }
      })
    }

    return {
      ...toRefs(state),
      checkboxGroup,
      PURCHASE_QUANTITY_MIN,
      PURCHASE_QUANTITY_MAX,
      PRICE_DECIMAL,
      rightBtnText,
      wrapperBottom,
      submitBottom,
      tabbarStore,
      totalPrice,
      onSubmit,
      onCheckedAll,
      onCountChange,
      onClickRight,
      onDeleteCart,
      onBeforeCountChange
    }
  }
})
</script>

<style lang="less" scoped>
.goods-wrapper {
  padding: 0 16px;
  padding-bottom: v-bind(wrapperBottom);
  box-sizing: border-box;
  background-color: var(--pxx-page-background);
  .goods-item {
    margin: 14px 0;
    padding: 20px 12px;
    border-radius: 8px;
    box-shadow: 0 0 12px #ebedf0;
    background: #fff;
    :deep(.van-card) {
      padding: 0 0 0 4px;
    }

    :deep(.van-checkbox__label) {
      flex: 1;
    }
  }
}

.submit-bar {
  bottom: v-bind(submitBottom);
  &-delete {
    padding: 0 12px;
  }
}

.empty {
  display: flex;
  margin: 40px auto;
  :deep(.van-empty__image){
    width: 80px;
    height: 80px;
    text-align: center;
  }
  .empty-btn {
    height: 40px;
    padding: 0 40px;
    margin-top: 20px;
  }
}
</style>
