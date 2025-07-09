<script setup lang="ts">
import { onMounted, ref } from 'vue';

const finds = ref<{ key: string; value: unknown }[]>([]);

onMounted(async () => {
  const data = await fetch('/api/finds');
  finds.value = await data.json();
});
</script>

<template>
  <div>
    <h2>Duck Roll Call</h2>
    <ul>
      <li v-for="duck in finds" :key="duck.key">
        <pre>{{ duck.value }}</pre>
      </li>
    </ul>
  </div>
</template>
