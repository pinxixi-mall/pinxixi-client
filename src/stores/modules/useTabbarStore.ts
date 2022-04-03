import { defineStore } from 'pinia'

/**
 * tabbar
 */
export default defineStore({
  id: 'tabbar',
  state: () => ({
    show: true,
    activePath: ''
  }),
  actions: {
    /**
     * tabbar显示/隐藏
     * @param isShwow 
     */
    setTabbarShow(isShwow: boolean) {
      this.show = isShwow
    },

    /**
     * 激活当前tabbar
     * @param path
     */
    setTabbarActive(path: string) {
      this.activePath = path
    }
  }
})