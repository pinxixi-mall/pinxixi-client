<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  <Tabbar v-show="tabbarStore.show" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tabbar from '@/components/Tabbar/index.vue'
import { useTabbarStore } from '@/stores'

export default defineComponent({
  components: { Tabbar },
  setup() {
    const tabbarStore = useTabbarStore()
    
    return {
      tabbarStore
    }
  }
})
</script>

<style lang="less" scoped>
.main {
  width: 100vw;
  height: calc(100vh - 50px);
  overflow: auto;
}
</style>
