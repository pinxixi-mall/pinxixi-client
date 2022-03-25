import { defineStore } from 'pinia'

/**
 * tabbar
 */
export default defineStore({
  id: 'tabbar',
  state: () => ({
    show: true
  }),
  actions: {
    /**
     * tabbar显示/隐藏
     * @param isShwow 
     */
    setTabbarShow(isShwow: boolean) {
      this.show = isShwow
    }
  }
})