import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import { createApp } from 'vue';

import App from './App.vue';
import { router } from './router';
import './style.css';

createApp(App)
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .component('PrimeInput', InputText)
  .component('PrimeSelect', Select)
  .component('PrimeTextarea', Textarea)
  .mount('#app');
