<template>
  <div class="loading-box">
    <van-loading color="#0094ff" />
    <div class="loading-text">{{ loadingText }}</div>
  </div>
</template>

<script>
export default {
  props: ['loadingText']
}
</script>

<style lang="less">
.loading-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loading-text {
    font-size: 14px;
    color: #666;
    margin-top: 10px;
  }
}
</style>
