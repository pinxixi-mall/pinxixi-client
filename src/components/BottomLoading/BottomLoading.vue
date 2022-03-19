<template>
  <van-loading class="loading" v-show="isLoading && !isLastPage">加载中...</van-loading>
  <div class="bottom-line" v-if="isLastPage">
    <span class="line"></span>
    <span>没有更多了</span>
    <span class="line"></span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    isLastPage: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">
.loading {
  margin: 20px auto;
}
.bottom-line {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 20px 0;
  color: #888;
  .line {
    width: 60px;
    height: 1px;
    background: #ccc;
    margin: 0 20px;
  }
}
</style>
