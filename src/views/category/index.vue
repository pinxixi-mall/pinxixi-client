<template>
  <div class="fixed-to-top van-hairline--bottom">
    <van-search v-model="searchValue" shape="round" show-action placeholder="请输入搜索关键词">
      <template #action>
        <div>搜索</div>
      </template>
    </van-search>
  </div>
  <div class="category-box" ref="siderbarBoxRef">
    <div class="siderbar-box" ref="siderbarRef">
      <van-sidebar class="siderbar" v-model="currentBar">
        <van-sidebar-item title="标签1" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称999" />
      </van-sidebar>
    </div>
    <div class="category-content">999</div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, unref, reactive } from 'vue'
import { useEventListener } from '@vant/use'

export default {
  setup() {
    const searchValue = ref()
    const currentBar = ref()
    const siderbarRef = ref()
    const siderbarBoxRef = ref()
    const touchData = reactive({
      curY: 0,
      curTop: 0,
      disY: 0
    })

    onMounted(() => {
    })

    const touchstart = (e: any) => {
      const siderbarEle = unref(siderbarRef)
      const siderbarBoxEle = unref(siderbarBoxRef)
      const {
        targetTouches: [touch]
      } = e
      touchData.curY = touch.pageY
      touchData.curTop = parseInt(siderbarEle.style.top || 0)
      console.log('------log------', siderbarEle.offsetHeight)
      console.log('------log------', siderbarBoxEle.offsetHeight)
      console.log('------log------', siderbarEle)
    }

    const touchmove = (e: any) => {
      const siderbarEle = unref(siderbarRef)
      const {
        targetTouches: [touch]
      } = e
      const disY = touch.pageY - touchData.curY
      const curTop = touchData.curTop
      if (parseInt(siderbarEle.style.top || 0) <= 300) {
        console.log('------disY------', touchData.disY,'------curTop------', parseInt(siderbarEle.style.top || 0))
        touchData.disY = disY
        siderbarEle.style.top = `${curTop + disY}px`
      }
    }

    const touchend = () => {
      const siderbarEle = unref(siderbarRef)
      console.log('------disY------', touchData.disY,'------curTop------', parseInt(siderbarEle.style.top || 0))
      const curTop = parseInt(siderbarEle.style.top || 0)
      if (touchData.disY > 0 && curTop >= 0) {
        slideToTop()
      } else {
        // slideToBottom()
      }
    }

    // 回弹到顶部
    const slideToTop = () => {
      const siderbarEle = unref(siderbarRef)
      let start: number = touchData.disY
      let step = 10

      const animation = (timestamp: any) => {
        step += 1
        start -= step
        if (start >= 0) {
          siderbarEle.style.top = `${start}px`
          window.requestAnimationFrame(animation)
        } else {
          siderbarEle.style.top = 0
          touchData.curTop = 0
          touchData.disY = 0
        }
      }
      window.requestAnimationFrame(animation)
    }

    useEventListener('touchstart', touchstart, { target: siderbarRef })
    useEventListener('touchmove', touchmove, { target: siderbarRef })
    useEventListener('touchend', touchend, { target: siderbarRef })

    return {
      currentBar,
      searchValue,
      siderbarRef,
      siderbarBoxRef
    }
  }
}
</script>

<style lang="less">
.category-box {
  // height: calc(100vh - 100px);
  // margin-top: 50px;
  width: 100%;
  position: absolute;
  top: 50px;
  bottom: 50px;
  .siderbar-box {
    position: absolute;
    top: 0;
    bottom: 0;
    .siderbar {
      height: 100%;
      overflow: hidden;
    }
  }
  .category-content {
    position: absolute;
    top: 0;
    left: 100px;
    right: 0;
  }
}
</style>
