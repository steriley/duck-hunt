import { createRouter, createWebHistory } from 'vue-router';

import HomeView from './views/HomeView.vue';
import SubmitView from './views/SubmitView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/submit', component: SubmitView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
