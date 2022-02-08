<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  <Tabbar />
</template>

<script lang="ts">
import Tabbar from '@/components/Tabbar/Tabbar.vue'

export default {
  components: { Tabbar }
}
</script>

<style lang="less">
.main {
  width: 100vw;
  height: calc(100vh - 50px);
  overflow: auto;
}
</style>
