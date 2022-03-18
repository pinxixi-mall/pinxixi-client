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

body {
  margin: 0;
  padding: 0;
}

</style>
