<script setup lang="ts">
import { onMounted, ref } from 'vue';

import FindersForm from './components/FindersForm.vue';

const ducks = ref('');

onMounted(async () => {
  const response = await fetch('/api');
  const data = await response.json();

  ducks.value = data.message;
});
</script>

<template>
  <h2>Hello {{ ducks }}</h2>
  <FindersForm />
</template>
