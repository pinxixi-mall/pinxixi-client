<script lang="ts">
import { defineComponent } from 'vue'
import Loading from './components/Loading/Loading.vue'

export default defineComponent({
  name: 'App',
  components: {
    Loading
  },
})
</script>
<template>
  <router-view></router-view>
</template>

<style>

body, p, h1, h2, h3, h4 {
  margin: 0;
  padding: 0;
}

</style>
