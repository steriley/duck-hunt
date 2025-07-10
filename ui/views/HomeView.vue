<script lang="ts" setup>
import DuckRollCall from '../components/DuckRollCall.vue';
</script>

<template>
  <h1>🦆 Report</h1>

  <router-link to="/submit" class="submit">Report Find</router-link>

  <DuckRollCall />
</template>

<style scoped>
.submit {
  display: inline-block;
  padding: 10px 20px;
  color: white;
  background-color: red;
  padding: 1rem;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 10;
}
</style>
