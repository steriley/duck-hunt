<script lang="ts" setup>
import DuckRollCall from '../components/DuckRollCall.vue';
</script>

<template>
  <h1>Duck Hunt</h1>
  <p>Welcome to the Duck Hunt game!</p>

  <p>Use the navigation to find ducks and submit your findings.</p>
  <router-link to="/submit">Submit a Duck</router-link>

  <DuckRollCall />
</template>
