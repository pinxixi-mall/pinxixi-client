import { unref, onMounted, onActivated, onUnmounted, onDeactivated } from 'vue'

export function useScrollToBottom(scrollBox: any, scrollContent: any,  callback: () => void) {
  let scrollEle: Element | Window | undefined
  let attached: boolean = false

  const listener = () => {
    const { offsetHeight: boxHeight, scrollTop } = unref(scrollBox)
    const { offsetHeight: contentHeight } = unref(scrollContent)
    if (boxHeight + scrollTop >= contentHeight) {
      callback()
    }
  }

  const add = () => {
    scrollEle = unref(scrollBox)
    if (scrollEle && !attached) {
      scrollEle.addEventListener('scroll', listener)
      attached = true
    }
  }

  const remove = () => {
    if (scrollEle && attached) {
      scrollEle.removeEventListener('scroll', listener)
      attached = false
    }
  }

  onMounted(add)
  onActivated(add)
  onUnmounted(remove)
  onDeactivated(remove)
}
