<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
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
body{
  background-color: var(--pxx-page-background);
}

</style>
