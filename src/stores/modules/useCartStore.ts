import { getCartList } from '@/api'
import { defineStore } from 'pinia'

/**
 * 购物车
 */
export default defineStore({
  id: 'cart',
  state: () => ({
    cartCount: 0,
  }),
  getters: {},
  actions: {
    async updateCartCount() {
      const { data } = await getCartList({ noLoading: true })
      this.cartCount = data.length
    }
  },
})
