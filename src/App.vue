<template>
  <router-view></router-view>
  <!-- <Loading v-show="loading" :loadingText="loadingText"></Loading> -->
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import Loading from './components/Loading/Loading.vue'

export default defineComponent({
  name: 'App',
  components: {
    Loading
  },
  setup() {
    const store = useStore()
    return {
      loading: computed(() => store.getters.loading),
      loadingText: computed(() => store.getters.loadingText)
    }
  }
})
</script>

<style>

* {
  margin: 0;
  padding: 0;
}
</style>
