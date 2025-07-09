<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { type DuckSubmission } from '../../common/types.js';

const finds = ref<{ key: string; value: DuckSubmission }[]>([]);

onMounted(async () => {
  const data = await fetch('/api/finds');
  finds.value = await data.json();
});
</script>

<template>
  <div class="duck-report">
    <template v-for="duck in finds" :key="duck.key">
      <img
        :src="duck.value.url"
        :alt="duck.value.duckId"
        class="duck-image"
        v-if="duck.value.url"
      />
      <div class="details-grid">
        <div class="detail-item">
          <div class="detail-label">Duck</div>
          <div id="duckId">{{ duck.value.duckId }}</div>
        </div>

        <div class="detail-item">
          <div class="detail-label">Found By</div>
          <div id="finderName">{{ duck.value.finderName }}</div>
        </div>

        <div class="detail-item">
          <div class="detail-label">Date Found</div>
          <div id="dateTime">{{ duck.value.dateTime }}</div>
        </div>

        <div class="detail-item">
          <div class="detail-label">Location</div>
          <div id="location">{{ duck.value.deck }}, {{ duck.value.section }}</div>
        </div>

        <div class="story-box">
          <div class="detail-label">Discovery Story</div>
          <div id="story">{{ duck.value.story }}</div>
        </div>

        <div class="watermark">QUACK</div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
:root {
  --duck-yellow: #ffd700;
  --water-blue: #1e90ff;
  --shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.details-grid {
  position: relative;
  margin-bottom: 3rem;
}

.duck-report {
  background: white;
  border-radius: 20px;
  box-shadow: var(--shadow);
  padding: 30px;
  max-width: 600px;
  position: relative;
  overflow: hidden;
}

.duck-report::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: var(--duck-yellow);
  border-radius: 50%;
  z-index: 0;
}

h1 {
  color: var(--water-blue);
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
}

.duck-image {
  width: 100%;
  height: 300px;
  object-fit: contain;
  border-radius: 15px;
  margin-bottom: 20px;
  border: 5px solid var(--duck-yellow);
  box-shadow: var(--shadow);
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.detail-item {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 10px;
  box-shadow: var(--shadow);
}

.detail-label {
  font-weight: bold;
  color: var(--water-blue);
  margin-bottom: 5px;
}

.story-box {
  grid-column: span 2;
  background: #fff8e1;
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
  border-left: 5px solid var(--duck-yellow);
  text-align: left;
}

.footer {
  text-align: center;
  margin-top: 20px;
  font-style: italic;
  color: #666;
}

.watermark {
  position: absolute;
  bottom: 10px;
  right: 10px;
  opacity: 0.1;
  font-size: 72px;
  transform: rotate(-15deg);
}
</style>
