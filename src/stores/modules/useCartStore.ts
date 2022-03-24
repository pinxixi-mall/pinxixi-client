import { defineStore } from 'pinia'

export default defineStore({
  id: 'cart',
  state: () => ({
    cartCount: 0, // 购物车数量
  }),
  getters: {
    cartCount: (state) => state.cartCount
  },
  actions: {
    setCartCount(count: number) {
      this.cartCount = count
    },
  },
})
