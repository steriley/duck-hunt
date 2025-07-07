<script setup lang="ts">
import { onMounted, ref } from 'vue';

const ducks = ref('');

onMounted(async () => {
  const response = await fetch('/api');
  const data = await response.json();

  ducks.value = data.message;
});
</script>

<template>
  <h2>Hello {{ ducks }}</h2>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
