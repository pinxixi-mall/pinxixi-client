<template>
  <div class="pxx-card">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    

    return {}
  }
})
</script>

<style scoped lang="less">
.pxx-card{
  padding: 12px;
  background-color: #fff;
  border-radius: var(--van-border-radius-lg);
}

</style>